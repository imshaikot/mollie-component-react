# Mollie Component React Wrapper

🚀 **Unofficial React Wrapper for Mollie.js**\
This package provides a **React-friendly integration** for [Mollie Components](https://docs.mollie.com/docs/mollie-components), enabling secure and PCI-compliant card payment forms.

💡 **Note:** This is an **unofficial wrapper** and is **not maintained or endorsed by Mollie**.

---

## 📦 Installation

Install the package via npm:

```sh
npm install mollie-component-react-wrapper
```

Ensure you have **React and ReactDOM** installed as peer dependencies:

```sh
npm install react react-dom
```

---

## 🚀 Usage

### **1️⃣ Initialize Mollie with `MollieComponentProvider`**

Wrap your application with `MollieComponentProvider` to initialize Mollie.js:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MollieComponentProvider } from 'mollie-component-react-wrapper';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <MollieComponentProvider profileId="your_profile_id" options={{ locale: 'en_US' }}>
    <App />
  </MollieComponentProvider>
);
```

Replace `your_profile_id` with your **Mollie Profile ID**.

---

### **2️⃣ Using the Standalone `MollieCardForm` Component**

`MollieCardForm` provides a fully integrated UI for collecting card details. It manages its own state and event handling.

```tsx
import { MollieCardForm } from 'mollie-component-react-wrapper';

const PaymentForm = () => {
  const handlePayment = (token: string) => {
    console.log('Received token:', token);
  };

  return (
    <div>
      <h2>Complete Payment</h2>
      <MollieCardForm onSubmit={handlePayment} />
    </div>
  );
};

export default PaymentForm;
```

✔ **Handles all card input fields internally**\
✔ **Automatic validation and error handling**\
✔ **Generates a token upon submission**

---

### **3️⃣ Using Individual Input Components**

For custom layouts, use individual input components with `forwardRef` support:

```tsx
import { MollieForm, MollieCardNumberInput, MollieCardHolderInput, MollieExpiryDateInput, MollieVerificationCodeInput } from 'mollie-component-react-wrapper';
import { useRef } from 'react';

const PaymentForm = () => {
  const cardNumberRef = useRef(null);
  const expiryDateRef = useRef(null);

  const handleSubmit = (token: string) => {
    console.log('Token received:', token);
  };

  return (
    <MollieForm onSubmit={handleSubmit}>
      <MollieCardNumberInput ref={cardNumberRef} onChange={() => console.log('Card number changed')} />
      <MollieCardHolderInput onBlur={() => console.log('Card holder field blurred')} />
      <MollieExpiryDateInput ref={expiryDateRef} onChange={() => console.log('Expiry date changed')} />
      <MollieVerificationCodeInput onBlur={() => console.log('CVC field blurred')} />
      <button type="submit">Pay Now</button>
    </MollieForm>
  );
};

export default PaymentForm;
```

✔ **Customizable layout**\
✔ **Event listeners available (`onChange`, `onBlur`, etc.)**\
✔ **Supports `ref` forwarding for better control**

---

## 🎨 Styling Inputs

You can customize the input styles using the `styles` prop:

```tsx
const inputStyle = {
  styles: {
    base: {
      color: '#333',
      fontSize: '16px',
      padding: '10px',
    }
  }
};

<MollieCardNumberInput styles={inputStyle} />
```

For more details, refer to [Mollie’s Styling Guide](https://docs.mollie.com/docs/mollie-components#styling).

---

## ⚡ API Reference

### **🔹 `MollieComponentProvider`**

| Prop        | Type     | Required | Description       |
| ----------- | -------- | -------- | ----------------- |
| `profileId` | `string` | ✅ Yes    | Mollie Profile ID |
| `options`   | `object` | ❌ No    | Additional Mollie configuration options |

### **🔹 `MollieCardForm`**

| Prop       | Type                      | Required | Description                                |
| ---------- | ------------------------- | -------- | ------------------------------------------ |
| `onSubmit` | `(token: string) => void` | ✅ Yes    | Callback when a payment token is generated |

### **🔹 Input Components**

| Component                     | Description                         |
| ----------------------------- | ----------------------------------- |
| `MollieCardNumberInput`       | Captures the card number            |
| `MollieCardHolderInput`       | Captures the cardholder's name      |
| `MollieExpiryDateInput`       | Captures the card's expiration date |
| `MollieVerificationCodeInput` | Captures the CVV security code      |

🔹 **Event Listeners for Inputs**

| Event      | Description                          |
| ---------- | ------------------------------------ |
| `onChange` | Triggered when input value changes   |
| `onBlur`   | Triggered when the input loses focus |
| `onFocus`  | Triggered when the input gains focus |

Example:

```tsx
<MollieCardNumberInput onChange={() => console.log('Card number updated')} />
```

---

## 🔐 Security Considerations

- **Do NOT store raw card details**.
- **Always use tokenized payments** for PCI compliance.
- **Use HTTPS** for secure data transmission.

---

