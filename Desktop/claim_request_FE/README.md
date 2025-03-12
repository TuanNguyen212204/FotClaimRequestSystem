# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

### File Structure
```
.
├── .dockerignore
├── .editorconfig
├── .gitignore
├── Dockerfile
├── LICENSE
├── README.md
├── README-zh_CN.md
├── CONTRIBUTING.md
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── assets/
│   │   ├── logo/
│   │   │   ├── eslint.svg
│   │   │   └── faker.svg
│   │   └── stories/
│   │       └── assets/
│   │           └── tutorials.svg
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   │   ├── xxxx/
│   ├── constants/
│   │   └── index.ts
│   ├── global.d.ts
│   ├── i18n/
│   │   ├── locales/
│   │   │       ├── common/
│   │   │       │  └── vi.json
│   │   │       └── vi.json
│   │   └── index.ts
│   ├── lib/
│   │   └── route-builder.ts
│   ├── routers/
│   ├── pages/
│   │   ├── admin/
│   │   │      ├── components/
│   │   │      ├── context/
│   │   │      ├── data/
│   │   │      │      ├── schema.ts
│   │   │      │      └── admin.json
│   │   │      ├── hooks/
│   │   │      └── index.tsx
│   │   └── main/
│   │       └── index.tsx
│   ├── utils/
│   ├── hooks/
│   ├── services/
│   ├── stores/
│   │   ├── slices/
│   │   │      └── adminSlice.ts
│   │   ├── thunks/
│   │   │      └── adminThunk.ts
│   │   ├── actions/
│   │   │      └── adminAction.ts
│   │   ├── selectors/
│   │   │      └── adminSelector.ts
│   │   └── rootReducer.ts
│   ├── types/
│   ├── styles/
│   │   └── tailwind.css
│   └── stories/
│       └── Configure.mdx
└── .storybook/
    └── main.ts

