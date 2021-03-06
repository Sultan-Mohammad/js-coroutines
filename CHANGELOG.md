#### 1.1.36

- fix documentation typo

#### 1.1.35

- fixed build issue

#### 1.1.34

- Update documentation
- Fix an issue with encodeURIComponent version of lz-string

#### 1.1.33

- Add compress and decompression from lz-string in the gaps

#### 1.1.32

- setTimeout idle time background processing
- can yield a number to request that number of m/s in the current frame (request does not carry over to the next frame)
- added async examples to getting started

#### 1.1.31

- Too early for last update, reverting

#### 1.1.30

- Use setTimeout for run timeouts to ensure we get some background processing

#### 1.1.29

- Fix a bug where terminate on the run promise was lost due to double async wrapping

#### 1.1.28

- Massively improve performance by replacing Yastjson's stack based bracket analyser with a couple of ints

#### 1.1.27

- Improve performance by reducing yields during the tokenise phase to 1 in every 2048 characters

#### 1.1.26

- Rewrite JSON tokenizer and AST for performance (again!)

#### 1.1.25

- Fix a problem with escaped JSON strings not being fully handled by yastjson
- Reintroduce .toJSON() in stringify

#### 1.1.24

- Made sure Async functions return a terminatable promise
- Fixed the CHANGELOG formatting!

#### 1.1.23

- Fix a bug with resolver now just being the actual promise resolve.

#### 1.1.22

- Link article on how it works

#### 1.1.21

- Documentation improvements

#### 1.1.20

- Updated the demo in the README.md to be the async one

#### 1.1.19

- Fixed build issue

#### 1.1.18

- Added Async function wrappers
- Refactored project structure
- Improved demo to show async

#### 1.1.15

- Licence updates
- Documentation typos

#### 1.1.14

- Added JSON functions for serialize/parse
- Updated test app
- Updated documentation
- Added CHANGELOG
