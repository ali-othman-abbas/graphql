//for tomorrow

// analyze graphql results, type it correctly
// fetch data, and display it to the user
import { drawAuditRatioGraph, drawPassesVsFailGraph } from "./draw";
import { completedProjectCount, lastCompletedProject, level, totalAuditRatioDown, totalAuditRatioUp, totalFails, totalXp, userInfo } from "./queries";
import { navigate } from "./router";
import { removeToken } from "./store";
import type { TotalXp, Level, TotalProjects, User, LastProjectCompleted, AuditRatioSum, ProgressCount } from "./types/response";
import { fetchGraph, htmlify, must } from "./utils";


const USERNAME_ID = 'username'
const EMAIL_ID = 'email'
const GENDER_ID = 'gender'
const PROJECTS_COMPLETED_ID = 'projects-completed'
const XP_ID = 'xp'
const LEVEL_ID = 'level'
const PROJECT_NAME_ID = 'project-name'
const GROUP_MEMBER_LIST_ID = 'group-member-list'
const AUDIT_RATIO_ID = 'audit-ratio'
const AUDIT_RATIO_GRAPH_ID = 'audit-ratio-graph'
const PASSES_VS_FAILS_GRAPH_ID = 'passes-vs-fails-graph'
const PASSES_ID = 'passes'
const FAILS_ID = 'fails'

function createGroupMemberEl(member: string) {
    return htmlify(/*html */ `
      <div class='group-member'>
        ${member}
      </div>
    `)
}




const homePageEl = htmlify(/*html */ `
  <div>
      <div id="user-info">
          <div id="username-section">
              <div>username:</div>
              <div id="${USERNAME_ID}"></div>
          </div>
          <div id="email-section">
              <div>email:</div>
              <div id="${EMAIL_ID}"></div>
          </div>
          <div id="year-section">
              <div>Gender:</div>
              <div id="${GENDER_ID}"></div>
          </div>
          <button id="logout">Logout</button>
      </div>
      <div id="stats">
          <div id="projects-completed-stat">
              <div>Projects Completed:</div>
              <div id="${PROJECTS_COMPLETED_ID}"></div>
          </div>
          <div id="xp-stat">
              <div>Total XP:</div>
              <div id="${XP_ID}"></div>
          </div>
          <div id="level-stat">
              <div>Level:</div>
              <div id="${LEVEL_ID}"></div>
          </div>
          <div id="last-project-completed-stat">
              <div class="project-name-group">
                <div>Last Completed Project:</div>
                <div id="${PROJECT_NAME_ID}"></div>
              </div>
              <div class="project-members-group">
                <div>members:</div>
                <div id="${GROUP_MEMBER_LIST_ID}">
                    ${""}
                </div>
              </div>
          </div>
          <div id="audit-ratio-graph-stat">
              <div>Audit Ratio</div>
              <div id="${AUDIT_RATIO_ID}"></div>
              <div id="${AUDIT_RATIO_GRAPH_ID}">
              </div>
              <div class="audit-ratio-legend">
                <div class="color-group">
                    <div class="green-box color-box"></div>
                    <div>up</div>
                </div>
                <div class="color-group">
                    <div class="red-box color-box"></div>
                    <div>down</div>
                </div>
              </div>
          </div>
          <div id="passes-vs-fails-stat">
            <div>Pass vs Fails</div>
            <div class="passes-group">
                <div>Passes:</div>
                <div id="${PASSES_ID}"></div>
            </div>
            <div class="fails-group">
                <div>fails:</div>
                <div id="${FAILS_ID}"></div>
            </div>
            <div id="${PASSES_VS_FAILS_GRAPH_ID}"></div>
      </div>
  </div>
`)

const logoutButtonEl = must(homePageEl.querySelector<HTMLButtonElement>('#logout'))
logoutButtonEl.addEventListener('click', () => {
    removeToken()
    navigate('/login')
})
const usernameEl = must(homePageEl.querySelector<HTMLElement>("#" + USERNAME_ID))
const emailEl = must(homePageEl.querySelector<HTMLElement>('#' + EMAIL_ID))
const genderEl = must(homePageEl.querySelector<HTMLElement>('#' + GENDER_ID))
const projectsCompletedEl = must(homePageEl.querySelector<HTMLElement>('#' + PROJECTS_COMPLETED_ID))
const xpEl = must(homePageEl.querySelector<HTMLElement>('#' + XP_ID))
const levelEl = must(homePageEl.querySelector<HTMLElement>('#' + LEVEL_ID))
const projectNameEl = must(homePageEl.querySelector<HTMLElement>('#' + PROJECT_NAME_ID))
const groupMemberListEl = must(homePageEl.querySelector<HTMLElement>('#' + GROUP_MEMBER_LIST_ID))
const auditRatioEl = must(homePageEl.querySelector<HTMLElement>('#' + AUDIT_RATIO_ID))
const auditRatioGraphEl = must(homePageEl.querySelector<HTMLElement>('#' + AUDIT_RATIO_GRAPH_ID))
const passesVsFailsEl = must(homePageEl.querySelector<HTMLElement>('#' + PASSES_VS_FAILS_GRAPH_ID))
const passesEl = must(homePageEl.querySelector<HTMLElement>('#' + PASSES_ID))
const failsEl = must(homePageEl.querySelector<HTMLElement>('#' + FAILS_ID))


export function showStats(appEl: HTMLElement) {
  appEl.replaceChildren(homePageEl)
  getUserData()
}

function getUserData() {
  getUserInfo(usernameEl, emailEl, genderEl)
  getProjectsCompleted(projectsCompletedEl)
  getXp(xpEl)
  getLevel(levelEl)
  getLastProjectInfo(projectNameEl, groupMemberListEl)
  getAuditRatio(auditRatioEl ,auditRatioGraphEl)
  getPassesVsFails(passesEl, failsEl, passesVsFailsEl)
}

async function getUserInfo(usernameEl: HTMLElement, emailEl: HTMLElement, genderEl: HTMLElement) {
  const [res, err] = await fetchGraph<User>(userInfo)
  if (err !== null) {
      console.error(err)
      return
  }
  console.log(res)
  const user = res.user[0]
  usernameEl.textContent = user.login
  emailEl.textContent = user.attrs.email
  genderEl.textContent = user.attrs.genders
}

async function getProjectsCompleted(el: HTMLElement) {
  const [res, err] = await fetchGraph<TotalProjects>(completedProjectCount)
  if (err !== null) {
      console.error(err)
      return
  }
  el.textContent = `${res.progress_aggregate.aggregate.count}`
}

async function getXp(el: HTMLElement) {
    const [res, err] = await fetchGraph<TotalXp>(totalXp)
    if (err !== null) {
        console.error(err)
        return
    }
    let xp = res.transaction_aggregate.aggregate.sum.amount
    const units = ['B', 'KB', 'MB', "GB", 'TB']
    let idx = 0
    while (xp > 1000) {
        xp = xp / 1000
        idx++
    }
    let decimalPlaces = 0
    let unit = 100
    while (xp < unit && unit > 1) {
        unit = unit / 10
        decimalPlaces++
    }
    el.textContent = `${xp.toFixed(decimalPlaces)} ${units[idx]}`
}

async function getLevel(el: HTMLElement) {
  const [res, err] = await fetchGraph<Level>(level)
  if (err !== null) {
      console.error(err)
      return
  }
  el.textContent = `${res.transaction[0].amount}`
}

async function getLastProjectInfo(nameEl: HTMLElement, containerEl: HTMLElement) {
    const [res, err] = await fetchGraph<LastProjectCompleted>(lastCompletedProject)
    if (err !== null) {
        console.error(err)
        return
    }

    res.user[0].groups[0].group.members

    const group = res.user[0].groups[0].group
    nameEl.textContent = `${group.object.name}`
    containerEl.replaceChildren(
        ...group
        .members
        .map(member => createGroupMemberEl(member.userLogin))
    )
}

async function getAuditRatio(el: HTMLElement, containerEl: HTMLElement) {
  const prom1 = fetchGraph<AuditRatioSum>(totalAuditRatioUp)
  const prom2 = fetchGraph<AuditRatioSum>(totalAuditRatioDown)
  const [[upAgg, err1], [downAgg, err2]] = await Promise.all([prom1, prom2])
  if (err1 !== null) {
      console.error(err1)
      return
  }
  if (err2 !== null) {
      console.error(err2)
      return
  }
  const up = upAgg.transaction_aggregate.aggregate.sum.amount
  const down = downAgg.transaction_aggregate.aggregate.sum.amount

  if (up === 0 && down === 0) {
      el.textContent = `GO DO AUDITS`
  } else if (down === 0) {
      el.textContent = `INFINITE`
  } else {
      el.textContent = `${(up/down).toFixed(1)}`
  }
  const graph = drawAuditRatioGraph({
      up,
      down,
      upColor: "green",
      downColor: "red"
  })
  containerEl.replaceChildren(graph)
}

async function getPassesVsFails(passesEl: HTMLElement, failsEl: HTMLElement, containerEl: HTMLElement) {
    const [[passesAgg, err1], [failsAgg, err2]] = await Promise.all([
        fetchGraph<ProgressCount>(completedProjectCount),
        fetchGraph<ProgressCount>(totalFails)
    ])
    if (err1 !== null) {
        console.error(err1)
        return
    }
    if (err2 !== null) {
        console.error(err2)
        return
    }
    const passes = passesAgg.progress_aggregate.aggregate.count
    const fails = failsAgg.progress_aggregate.aggregate.count
    passesEl.textContent = `${passes}`
    failsEl.textContent = `${fails}`

    const graph = drawPassesVsFailGraph({
        passes,
        fails,
        passesColor: 'green',
        failsColor: 'red'
    })
    containerEl.replaceChildren(graph)
}