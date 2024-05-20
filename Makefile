
new:
	node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))

docs-dev:
	cd docs && npm run docs:dev