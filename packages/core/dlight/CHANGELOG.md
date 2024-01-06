# @dlightjs/dlight

## 1.0.0-alpha.54

### Patch Changes

- fix: flat node mutablecalling

## 1.0.0-alpha.53

### Patch Changes

- 07ae958: feat: lazy load didMountStore

## 1.0.0-alpha.52

### Patch Changes

- faa61e0: refactor: change for loop \_$nodes to getter only

## 1.0.0-alpha.51

### Patch Changes

- refactor: using map for for node

## 1.0.0-alpha.50

### Patch Changes

- refactor: rebuild unmount with store

## 1.0.0-alpha.49

### Patch Changes

- fix: shortcutType for node typo

## 1.0.0-alpha.48

### Patch Changes

- feat: add arrayVeryDifferent for node check

## 1.0.0-alpha.47

### Patch Changes

- feat: add lifecycle and onUpdate

## 1.0.0-alpha.46

### Patch Changes

- refactor: new lifecycle pipeline

## 1.0.0-alpha.45

### Patch Changes

- fix: didmount not calling when adding mutablenodes

## 1.0.0-alpha.44

### Patch Changes

- refactor: ensure element prop only

## 1.0.0-alpha.43

### Patch Changes

- refactor: remove log

## 1.0.0-alpha.42

### Patch Changes

- feat: didmount after element added to the dom

## 1.0.0-alpha.41

### Patch Changes

- feat: add willParseTemplate support

## 1.0.0-alpha.40

### Patch Changes

- fix: for node updateArr not updated correctly

## 1.0.0-alpha.39

### Patch Changes

- feat: move store outside to get single instance

## 1.0.0-alpha.38

### Patch Changes

- refactor: delay init envstore

## 1.0.0-alpha.37

### Patch Changes

- refactor: add store and to js

## 1.0.0-alpha.36

### Patch Changes

- fix: insert with index instead of mutable node postion (BIG FLAW)

## 1.0.0-alpha.35

### Patch Changes

- fix: delete log

## 1.0.0-alpha.34

### Patch Changes

- fix: update item for node generator

## 1.0.0-alpha.33

### Patch Changes

- fix: no update arr if no shuffle

## 1.0.0-alpha.32

### Patch Changes

- fix: for updateArr not updating correctly

## 1.0.0-alpha.31

### Patch Changes

- fix: env need to merge new envs when still in that environment

## 1.0.0-alpha.30

### Patch Changes

- fix: node optional bind

## 1.0.0-alpha.29

### Patch Changes

- fix: add willUnmount bind this

## 1.0.0-alpha.28

### Patch Changes

- feat: compNode init after constructor

## 1.0.0-alpha.27

### Patch Changes

- fix: store env

## 1.0.0-alpha.26

### Patch Changes

- feat: rebuild update logic - declaration first

## 1.0.0-alpha.25

### Patch Changes

- fix: no env update before this.\_$update is initd

## 1.0.0-alpha.24

### Patch Changes

- refactor: allow prop change before \_$nodes generated

## 1.0.0-alpha.23

### Patch Changes

- refactor: cleanup condnode and willUnmount

## 1.0.0-alpha.22

### Patch Changes

- c6cd5e0: fix: remove env when node is unmounted

## 1.0.0-alpha.21

### Patch Changes

- fix: condNode redundant update

## 1.0.0-alpha.20

### Patch Changes

- fix: single env store in window

## 1.0.0-alpha.19

### Patch Changes

- fix: subview + dynamic textnode + textnode insert

## 1.0.0-alpha.18

### Patch Changes

- feat: add switch statement support

## 1.0.0-alpha.17

### Patch Changes

- fix: double layers' forwardProp not reactive

## 1.0.0-alpha.16

### Patch Changes

- fix: remove ifNode prevent dep num

## 1.0.0-alpha.15

### Major Changes

- fix: content check strictly don't equal null

## 1.0.0-alpha.14

### Patch Changes

- build

## 1.0.0-alpha.13

### Patch Changes

- fix: $forwardPropsId in nested forwardProps not been updated

## 1.0.0-alpha.12

### Patch Changes

- feat: manual update derived props before init

## 1.0.0-alpha.11

### Patch Changes

- refactor: no initialized derived prop

## 1.0.0-alpha.10

### Patch Changes

- refactor: didMount after insert element

## 1.0.0-alpha.9

### Patch Changes

- refactor: change lifecycle order: willXX outside in didXX inside out

## 1.0.0-alpha.8

### Patch Changes

- feat: change didMount timing to after parentEl adding

## 1.0.0-alpha.7

### Patch Changes

- build

## 1.0.0-alpha.6

### Patch Changes

- fix: expnode no parentel assign in the inited phase

## 1.0.0-alpha.5

### Patch Changes

- feat: add force update function

## 1.0.0-alpha.4

### Patch Changes

- fix: build

## 1.0.0-alpha.3

### Patch Changes

- fix: no redundant update for new nodes in if and for

## 1.0.0-alpha.2

### Patch Changes

- feat: add cached html prop and force for update

## 0.10.2

### Patch Changes

- fix: event not reactive

## 0.10.1

### Patch Changes

- feat: Add @Watch and fix dep loop

## 0.10.0

### Minor Changes

- feat: upgrade to 0.10.0

## 0.9.30

### Patch Changes

- feat: add subview type support

## 0.9.29

### Patch Changes

- feat: add advanced dx

## 0.9.28

### Patch Changes

- Type change

## 0.9.27

### Patch Changes

- fix if node dependency order

## 0.9.26

### Patch Changes

- Test changeset
