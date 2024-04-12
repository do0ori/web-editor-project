ARCH=amd64
IMG_REGISTRY=do0ori
IMG_NAME=sprint4-be
IMG_TAG=${IMG_REGISTRY}/${IMG_NAME}:latest

all:
	cat ./Makefile

test:
	npm test

node:
	npm ci
	npm run build

image: Dockerfile node
	docker build --platform=linux/${ARCH} --tag ${IMG_TAG} .

push:
	docker push ${IMG_TAG}

deploy: notes-be.yaml
	kubectl apply -f notes-be.yaml

undeploy:
	kubectl delete -f notes-be.yaml

clean:
	\rm -rf build
	docker rmi ${IMG_TAG}