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
| `V64Button` | Action button, `primary` / `secondary` / `danger` | — |
| `V64Checkbox` | Tick box drawn as `[x]` | `Boolean` |
| `V64Hero` | Banner framed by the tape loading stripes | — |
| `V64Input` | Single line text field with label and error state | `String` |
| `V64Page` | Screen frame with the boot header, sets the theme | — |
| `V64ProgressBar` | Character based bar, determinate or endless | — |
| `V64Radio` | Single radio drawn as `(*)` | value of the group |
| `V64RadioGroup` | Radios from an `options` array | value of the group |
| `V64Select` | Dropdown with a character arrow | `String` |
| `V64Slider` | Range control with an optional readout | `Number` |
| `V64Text` | Monospaced text block, keeps its whitespace | — |
| `V64Toggle` | On/off switch | `Boolean` |

Every form component supports `v-model`, a `disabled` state, keyboard use and a
label that is tied to its control. `V64Button`, `V64Input`, `V64Select`,
`V64Slider` and `V64ProgressBar` take `block` to fill the width of their
container.

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
- Styled component names must not collide with an HTML or SVG tag. Vue treats
  `Track`, `Title`, `Head`, `Body` and `Legend` as reserved, and a name that
  matches a void element such as `<track>` silently breaks the template.

## Tests and linting

```
yarn test:unit
yarn lint
```

`yarn test:e2e` needs the Cypress binary, which has to be downloaded once.

## Build

```
yarn build:lib     # the library bundle
yarn build         # the Storybook site
```

Webpack 4 cannot use OpenSSL 3, so on Node 17 and newer both builds need
`NODE_OPTIONS=--openssl-legacy-provider`. Without it they stop with
`ERR_OSSL_EVP_UNSUPPORTED`.

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
