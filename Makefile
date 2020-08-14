VSN=$(shell cat metadata.json | jq '.version')
PKG=$(shell basename $(PWD))
DEST=../$(PKG)-$(VSN).zip

all:
	glib-compile-schemas schema/

release: all
	@rm -f ../$(DEST)
	@git archive --format=zip -o $(DEST) master
	@echo "Written $(DEST)"
