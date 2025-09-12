# pw-smashburger

## Structure

```
src/
├── pages/           # Page objects
│   ├── base/        # BasePage with common methods
│   │   ├── BasePage.ts
│   │   └── Header.ts
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── LocationsPage.ts
│   ├── MenuPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/           # Test files
│   ├── fixtures/    # Test fixtures
│   ├── login.spec.ts
│   └── checkout.spec.ts
├── fixtures/        # Test data
│   └── loginUsers.ts
└── helpers/        # Test helpers
```

## Environment Setup

### 1. Create .env.dev file
```bash
# Base URL for your application
BASE_URL=https://*env*.smashburger.com
```

### 2. Install dependencies
```bash
npm install
npx playwright install
```

### 3. Available Methods
- `goto(path?)` - Navigate to page (with optional path)
- `click(locator)` - Click element
- `type(locator, text)` - Type text
- `expectVisible(locator)` - Check element is visible
- `expectText(locator, text)` - Check element text
- `expectUrl(url)` - Check current URL

### 4. Test Data
Use fixture data from `fixtures/loginUsers.ts`:
```typescript
import { users } from '@/fixtures/loginUsers';

// Use in tests
await loginPage.loginUser(users.validUser.email, users.validUser.password);
```

## Page Objects

### BasePage
Common methods available to all page objects:
- Navigation: `goto()`
- Interactions: `click()`, `type()`
- Assertions: `expectVisible()`, `expectText()`, `expectUrl()`

### Header
Navigation methods:
- `clickLogo()` - Go to homepage
- `clickSignin()` - Go to sign in page
- `navigateToMenu(menuName)` - Navigate to specific menu
- `goToCart()` - Go to cart page

### LoginPage
- `loginUser(email, password)` - Sign in with credentials

## Configuration

- **Base URL**: Set in `.env.dev` file
- **Browser**: Chromium, Firefox, WebKit (mobile disabled)
- **Timeouts**: 30s for tests, 10s for actions
- **Reports**: HTML, JSON, JUnit formats