BUILD_DIR := build
DIST_DIR := dist
SRC_DIR := src
PACKAGED_FILE := zhuyin.zip

clean:
	@git clean -fXd
	@echo "✓ Cleaned environment"

build: clean
	@mkdir -p $(BUILD_DIR)
	@cp -r $(SRC_DIR)/* $(BUILD_DIR)/
	@cp LICENSE $(BUILD_DIR)/
	@echo "✓ Extension built in $(BUILD_DIR)/"

dist: build
	@mkdir -p $(DIST_DIR)
	@cd $(BUILD_DIR) && zip -r ../$(DIST_DIR)/$(PACKAGED_FILE) .
	@echo "✓ Extension zipped as $(DIST_DIR)/$(PACKAGED_FILE)"
