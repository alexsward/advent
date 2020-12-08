.PHONY: build clean install
default: day

2020: build
	node dist/2020/day07/index.js

2020-test: build
	npm test -- dist/2020/day07/index.test.js

2019: build
	node dist/2019/day06/index.js

2019-test: build
	npm test -- dist/2019/day06/index.test.js

build:
	tsc --build
