.PHONY: dbuild wbuild install run test lint bash

# Initialiasing variables
TAG=dev-latest
NODE_ENV ?= local
DEV_SERVER_PORT ?= 8090
IMAGE_NAME = inject-test
DOCKER_RUN = docker run -it --rm -e NODE_ENV=$(NODE_ENV)

ifeq ($(NODE_ENV), local)
    DOCKER_RUN += -p $(DEV_SERVER_PORT):$(DEV_SERVER_PORT) -e DEV_SERVER_PORT=$(DEV_SERVER_PORT)
    DOCKER_RUN += -v $$(pwd)/app:/usr/local/apache2/htdocs
endif

# := is "immediate set" not the default = (i.e. "lazy set")
# see https://stackoverflow.com/a/448939/828366
DOCKER_RUN_CMD := $(DOCKER_RUN)
DOCKER_RUN += $(IMAGE_NAME):dev-latest

# --- TARGETS --- #

default: dbuild

dbuild:
	# Builds the docker image and tags it
	@echo "Building image $(IMAGE_NAME):$(TAG)"
	docker image build \
		--build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
		--build-arg VERSION=$(CODE_VERSION) \
		--build-arg VCS_URL=`git config --get remote.origin.url` \
		--build-arg VCS_REF=$(GIT_COMMIT) \
		-t $(IMAGE_NAME):$(TAG) -f ./Dockerfile .

	docker tag $(IMAGE_NAME):$(TAG) $(IMAGE_NAME):dev-latest

wbuild:
	# Creates the webpack build
	@echo "Creating Webpack build"
	$(DOCKER_RUN) npm run build

install:
	# Installs all packages or a single one (e.g. make PACKAGE="jasmine --save-dev" install)
	@echo "Running NPM install"
	$(DOCKER_RUN) npm install $(PACKAGE)

run:
	# Runs the webpack-dev-server on localhost:$(DEV_SERVER_PORT)
	# Use the atob/btoa JS functions to respectively decode/encode the APP_CONFIG env variable
	@echo "Running image $(IMAGE_NAME)"
	$(DOCKER_RUN_CMD) \
		-e APP_CONFIG='$(APP_CONFIG)' \
		$(IMAGE_NAME):dev-latest \
		npm start

test:
	# Runs the specs
	@echo "Running tests"
	$(DOCKER_RUN) npm test

bash:
	# Getting inside container
	$(DOCKER_RUN) /bin/bash
