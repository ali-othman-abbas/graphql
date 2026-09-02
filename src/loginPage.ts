import { htmlify, must } from "./utils";

const loginPageEl = htmlify(/* html */ `
  <div>
      <div>Log into your reboot01 account</div>
      <form>
          <label> Username or Email
              <input type="text" required/>
          </label>
          <label> Password
              <input type="password" required/>
          </label>
          <button type="submit">Submit</button>
      </form>
  </div>
`);

const formEl = must(loginPageEl.querySelector<HTMLFormElement>('form'))
const loginEl = must(loginPageEl.querySelector<HTMLInputElement>('input[type="text"]'))
const passwordEl = must(loginPageEl.querySelector('input[type="password"]'))


