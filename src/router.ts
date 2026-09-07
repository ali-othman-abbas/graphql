import { showLoginPage } from "./loginPage";
import { appEl } from "./shared";
import { showStats } from "./stats";
import { getToken } from "./store";

export function navigate(path: string) {
  history.pushState(null, "", path)
  router()
}

function router() {
    const path = window.location.pathname
    console.log(path)
    const token = getToken()
    if (path === "/login" && !token) {
        showLoginPage(appEl)
        return
    }
    if (!token) {
        navigate("/login")
        return
    }
    if(path === "/"){
        showStats(appEl);
        return
    } else {
        navigate("/")
    }
}