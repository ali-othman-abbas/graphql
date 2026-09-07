import { deal, htmlify, must } from "./utils";
import type { ErrorResponse } from "./types/response";
import { storeToken } from "./store";
import { navigate } from "./router";

const ERROR_C = "error"
const LOGIN_ERROR_MESSAGE_ID = 'login-error-message'
const PASSWORD_ERROR_MESSAGE_ID = 'password-error-message'
const FORM_SUBMIT_ERROR_ID = 'form-submit-error'

type FieldError = "too long" | "empty" | ""

const FIELD_MAX_LEN = 1000


const loginPageEl = htmlify(/* html */ `
  <div>
      <div>Log into your reboot01 account</div>
      <div id="${FORM_SUBMIT_ERROR_ID}" hidden></div>
      <form>
          <div class="error-group">
            <label for="login">Username or email:</label>
            <input id="login" type="text" maxLength="${FIELD_MAX_LEN}"/>
            <div id="${LOGIN_ERROR_MESSAGE_ID}" class="error-message" hidden></div>
          </div>
          <div class="error-group">
            <label for="login">Password:</label>
            <input id="login" type="password" maxLength="${FIELD_MAX_LEN}"/>
            <div id="${PASSWORD_ERROR_MESSAGE_ID}" class="error-message" hidden></div>
          </div>
          <button type="submit" disabled>Submit</button>
      </form>
  </div>
`);

export function showLoginPage(appEl: HTMLElement) {
    appEl.replaceChildren(loginPageEl)
}

const formEl = must(loginPageEl.querySelector<HTMLFormElement>('form'))

const loginEl = must(loginPageEl.querySelector<HTMLInputElement>('input[type="text"]'))
const loginErrEl = must(loginPageEl.querySelector<HTMLElement>('#' + LOGIN_ERROR_MESSAGE_ID))

const passwordEl = must(loginPageEl.querySelector<HTMLInputElement>('input[type="password"]'))
const passwordErrEl = must(loginPageEl.querySelector<HTMLElement>('#' + PASSWORD_ERROR_MESSAGE_ID))

const buttonEl = must(loginPageEl.querySelector<HTMLButtonElement>('button'))
const formSubmitErrEl = must(loginPageEl.querySelector<HTMLElement>('#' + FORM_SUBMIT_ERROR_ID))


loginEl.addEventListener("input", () => {
  const err = checkFieldValidity(loginEl)
  setFieldState(loginEl, err)
  setFieldErrState(loginErrEl, err, "login")
  setButtonState()
})

passwordEl.addEventListener("input", () => {
  const err = checkFieldValidity(passwordEl)
  setFieldState(passwordEl, err)
  setFieldErrState(passwordErrEl, err, "password")
  setButtonState()
})

formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
  const loginErr = checkFieldValidity(loginEl)
  const passwordErr = checkFieldValidity(passwordEl)
  if (loginErr !== "" || passwordErr !== "") {
      return
  }
  const login = loginEl.value;
  const pass = passwordEl.value;
  const authStr = new TextEncoder().encode(`${login}:${pass}`).toBase64()
  const [res, err] = await deal(fetch(`https://learn.reboot01.com/api/auth/signin`, {
    method: "POST",
    headers: {
        Authorization: `Basic ${authStr}`
    }
  }
  ));
  if (err) {
    showNetworkErr(formSubmitErrEl, "failed to send login information")
    return
  }
    if (!res.ok) {
      const json = await res.json() as ErrorResponse
      showRequestErr(formSubmitErrEl, json)
      return
  }
  hideErr(formSubmitErrEl)
  storeToken(await res.json())
  navigate("/")
})

function checkFieldValidity(el: HTMLInputElement): FieldError {
  if (el.value.length === 0)
    return "empty"

  if (el.value.length > FIELD_MAX_LEN)
    return "too long"

  return ""
}

function setFieldErrState(errEl: HTMLElement, err: FieldError, fieldName: 'login' | 'password') {
  switch (err) {
    case "empty":
      errEl.hidden = false
      errEl.textContent = `${fieldName} can't be empty`
      break;
    case "too long":
      errEl.hidden = false
      errEl.textContent = `${fieldName} can't be longer than ${FIELD_MAX_LEN}`
      break;
    case "":
      errEl.hidden = true
      errEl.textContent = ''
  }
}

function setButtonState() {
  const loginErr = checkFieldValidity(loginEl)
  const passwordErr = checkFieldValidity(passwordEl)
  if (loginErr === "" && passwordErr === "") {
    buttonEl.disabled = false
    return
  }
  buttonEl.disabled = true
}

function setFieldState(el: HTMLElement, err: FieldError) {
  if (err === "") {
    el.classList.remove(ERROR_C)
    return
  }
  el.classList.add(ERROR_C)
}

function showNetworkErr(errEl: HTMLElement, msg: string) {
  errEl.hidden = false
  errEl.textContent = `Network Error: ${msg}`
}

function showRequestErr(errEl: HTMLElement, err: ErrorResponse) {
    errEl.hidden = false
    errEl.textContent = err.error
}

function hideErr(errEl: HTMLElement) {
  errEl.hidden = true
}
