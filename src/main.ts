import { showLoginPage } from "./loginPage";
import { appEl } from "./shared";
import { showStats } from "./stats";
import { getToken } from "./store";


export function router() {
    const token = getToken()
    if (token) {
        showStats(appEl);
    } else {
        showLoginPage(appEl);
    }
}

router();