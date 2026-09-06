# vuemodore-64

Commodore 64 styled design system for Vue 2.

A set of the web components you reach for every day — buttons, text fields,
radios, sliders, banners — drawn the way a C64 would have drawn them: the
16 colours of the VIC-II chip, an 8x8 monospaced character grid, square
corners, and no animation the machine could not have managed.

Storybook: [vuemodore-64.vercel.app](https://vuemodore-64.vercel.app/)

## Project setup

```
yarn install
```

## Project Storybook

```
yarn storybook
```

Storybook 6 with `@storybook/addon-essentials`, so every story is written with
args: the Controls panel is filled from each component's own props, and props
can be changed in the browser rather than by editing a story. Actions are
declared through `argTypes` instead of imported per story.

Two devDependencies look unused and must stay: removing `@storybook/addons` and
`@storybook/addon-actions` re-resolves the Babel tree and the preview build then
dies silently -- `build-storybook` still exits 0, but writes no `iframe.html`.
Check for that file after touching the Storybook dependencies.

## Usage

Register everything at once:

```js
import Vue from 'vue';
import Vuemodore64 from 'vuemodore-64';

Vue.use(Vuemodore64);
```

Or import only the components you use, so the rest is tree shaken away:

```js
import { V64Button, V64Input } from 'vuemodore-64';

export default {
  components: { V64Button, V64Input },
};
```

## Components

| Component | Purpose | `v-model` |
| --- | --- | --- |
| **Layout & content** | | |
| `V64Page` | Screen frame with the boot header, sets the theme | — |
| `V64Hero` | Banner framed by the tape loading stripes | — |
| `V64Panel` | Window with a title bar; the base for `V64Modal` | — |
| `V64Divider` | Rule drawn with box characters, optionally labelled | — |
| `V64Text` | Monospaced text block, keeps its whitespace | — |
| `V64Table` | Directory-listing table, scrolls inside its own box | — |
| **Actions** | | |
| `V64Button` | Action button, `primary` / `secondary` / `danger` | — |
| `V64Link` | Anchor; a `_blank` link gets a safe `rel` and a marker | — |
| `V64Badge` | Inverted-character tag, four tones | — |
| `V64Key` | Keycap from the C64's own keyboard | — |
| **Feedback** | | |
| `V64Alert` | Message in the `?SYNTAX ERROR` idiom, four variants | — |
| `V64Toast` | Alert pinned to a corner, closes itself | `Boolean` |
| `V64Modal` | Dialog over the page, Escape and focus handled | `Boolean` |
| `V64Spinner` | Rotating character cursor for short waits | — |
| `V64ProgressBar` | Character bar, determinate or endless | — |
| `V64LoadingScreen` | Full tape loading screen with flashing border | — |
| `V64Tooltip` | Bubble on hover and on focus | — |
| **Forms** | | |
| `V64FormField` | Label, hint and error for any control | — |
| `V64Input` | Single line text field | `String` |
| `V64Textarea` | Multi-line field with a character count | `String` |
| `V64NumberInput` | Number field with stepper buttons | `Number` |
| `V64FileInput` | File picker behind a `PRESS PLAY ON TAPE` button | — |
| `V64Select` | Dropdown with a character arrow | `String` |
| `V64Radio` | Single radio drawn as `(*)` | value of the group |
| `V64RadioGroup` | Radios from an `options` array | value of the group |
| `V64Checkbox` | Tick box drawn as `[x]` | `Boolean` |
| `V64Toggle` | On/off switch | `Boolean` |
| `V64Slider` | Range control with an optional readout | `Number` |
| **Navigation** | | |
| `V64Menu` | Game menu with a `>` cursor and arrow keys | — |
| `V64Tabs` | Tabs with arrow-key navigation and panels | `String` |
| `V64Breadcrumb` | Trail to the current page | — |
| `V64Pagination` | Pager that keeps its width at any page count | `Number` |
| **C64 flavour** | | |
| `V64Terminal` | Console output, optionally typed out character by character | — |
| `V64Scroller` | Demoscene scrolltext, seamless | — |
| `V64PixelIcon` | Sprite drawn as rows of characters | — |

Every form component supports `v-model`, a `disabled` state, keyboard use and a
label that is tied to its control through `V64FormField`, which also carries the
hint and error text. Most components take `block` to fill the width of their
container.

Components that take a list -- `V64Select`, `V64RadioGroup`, `V64Menu`,
`V64Tabs` -- accept plain strings and numbers as well as
`{ value, label, disabled }` objects, so the common case stays short.

Each component has its own story; `yarn storybook` shows every state, and the
**All** story renders them together on one screen.

### Examples

```vue
<V64Input v-model="filename" label="Filename" placeholder="ENTER NAME" block />
<V64Select v-model="device" label="Device" :options="['Tape', 'Disk']" />
<V64RadioGroup v-model="speed" label="Speed" :options="['Slow', 'Fast']" inline />
<V64Slider v-model="volume" label="Volume" show-value />
<V64ProgressBar :value="loaded" label="Loading" show-value />
<V64Button @click="load">Load "*",8,1</V64Button>
```

`options` accepts plain strings and numbers, or `{ value, label, disabled }`
objects when the label and the value differ.

## Theming

Colours live in one place, `src/styles/theme.js`:

- `V64_PALETTE` — the 16 hardware colours of the C64.
- `V64_THEME` — the semantic theme every component reads (`primary`,
  `secondary`, `green`, `grey`, …).
- `V64_FONT` — the monospaced font stack.

Components fall back to `V64_THEME` on their own, so they can be dropped
anywhere. To recolour a whole screen, hand `V64Page` a theme:

```vue
<V64Page :theme="{ ...V64_THEME, primary: V64_PALETTE.lightgreen }">
  <V64Button>Run</V64Button>
</V64Page>
```

Styling is done with `vue-styled-components`, so the CSS ships inside the
bundle — consumers need no Sass setup or extra stylesheet import. The project
itself has no Sass toolchain either: `node-sass` cannot be built on a current
Node release, and nothing imported a stylesheet any more.

## Conventions

Anything added to the library follows the existing components:

- One folder per component under `src/components/`, holding `index.vue`,
  `index.stories.js` and `__tests__/index.spec.js`.
- Exported from `src/components/index.js` as `V64<Name>`; the entry point test
  fails if a component is built but never exported.
- Props are typed, have defaults, and are validated where the set of values is
  closed. Props are never mutated — state changes leave as events.
- Form components declare `model`, generate their own id with
  `src/utils/uid.js`, and label their control.
- Styled component names must not collide with an HTML or SVG tag, and must
  differ from the component's own `name` (Vue would resolve it to itself and
  recurse). `Track`, `Title`, `Head`, `Body`, `Legend`, `Line`, `Cursor`,
  `Caption`, `Content` and `Footer` are all taken; a name matching a void
  element such as `<track>` silently breaks the template.
- A styled `input` hands its `@input` listener the value as a string rather than
  the DOM event -- `src/utils/domValue.js` absorbs the difference.
- Timers belong in `mounted`, not in an `immediate` watcher: the watcher runs
  before the component exists.

## Tests and linting

```
yarn test:unit
yarn lint
```

`yarn test:e2e` needs the Cypress binary, which has to be downloaded once.

## Build

```
yarn build:lib     # the library bundle
yarn build         # the Storybook site, into dist/
```

Webpack 4 cannot use OpenSSL 3, so on Node 17 and newer both builds need
`NODE_OPTIONS=--openssl-legacy-provider`. Without it they stop with
`ERR_OSSL_EVP_UNSUPPORTED`.

## Example site

`src/example/` is a fictional online magazine for a C64 community, *Return to
Basic*, built to put the library through a real page rather than isolated
stories. It uses every component: a masthead and scrolling ticker, tabs for the
sections, a lead article with a type-in listing typed out character by
character, sortable and paginated demo charts, a poll that turns into result
bars, a letters page with a validated form, an upload workshop, an order dialog,
a CRT toggle and a tape loading screen when you switch issues.

```
yarn serve          # the magazine, on its own
yarn build:example  # into dist/example
```

It deploys alongside Storybook: `vercel.json` builds both, so the published site
serves Storybook at `/` and the magazine at `/example/`.

Building it found three layout bugs that isolated stories had hidden, all the
same shape -- something that cannot wrap widening everything around it:

- `V64Page` let its content set the page width, because a flex item defaults to
  `min-width: auto`. One ticker made the whole page 4000px wide.
- `V64Divider` had the same problem with its 200-character rule.
- `V64Text` rendered a bare `pre`, which never wraps, so a paragraph of prose
  pushed the page out. It keeps whitespace but wraps now.

Layout is the one thing the unit tests cannot see: `vue-styled-components`
injects no CSS under jsdom, so `document.styleSheets` is empty in tests. Check
layout changes against the example page in a browser.

## Deployment

Storybook is deployed by Vercel: every push to `master` publishes
[vuemodore-64.vercel.app](https://vuemodore-64.vercel.app/), and every pull request gets
its own preview. `engines.node` in `package.json` pins the Node release Vercel builds on -- a
project configured for a Node version Vercel has since discontinued is rejected
before the build starts. `vercel.json` pins the build command and the output
directory so
the deployment carries the flag above -- Vercel builds on a current Node, where
the default build crashes. It also skips the Cypress binary download, which the
Storybook build does not need.
