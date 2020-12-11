.PHONY: build clean install
default: day

2020: build
	node dist/2020/day10/index.js

2020-test: build
	npm test -- dist/2020/day10/index.test.js

2019: build
	node dist/2019/day05/index.js

2019-test: build
	npm test -- dist/2019/day05/index.test.js

2018: build
	node dist/2018/day04/index.js

2018-test: build
	npm test -- dist/2018/day04/index.test.js

build:
	tsc --build
