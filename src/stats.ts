//for tomorrow
// analyze graphql results, type it correctly
// fetch data, and display it to the user
import { htmlify, must } from "./utils";



const USERNAME_ID = 'username'
const EMAIL_ID = 'email'
const GENDER_ID = 'gender'
const PROJECTS_COMPLETED_ID = 'projects-completed'
const XP_ID = 'xp'
const LEVEL_ID = 'level'
const GROUP_MEMBER_LIST_ID = 'group-member-list'

const homePageEl = htmlify(/*html */ `
  <div>
      <div id="user-info">
          <div id="username-section">
              <div>username:</div>
              <div id="${USERNAME_ID}"></div>
          </div>
          <div id="email-section">
              <div>email</div>
              <div id="${EMAIL_ID}"></div>
          </div>
          <div id="year-section">
              <div>Gender</div>
              <div id="${GENDER_ID}"></div>
          </div>
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
              <div id="project-name"></div>
              <div id="${GROUP_MEMBER_LIST_ID}">
                ${""}
              </div>
          </div>
          <div id="audit-ratio-graph-stat">
              <div>Audit Ratio</div>
              ${""}
          </div>
          <div id="passes-vs-fails-stat">
              <div>Pass vs Fails</div>
              ${""}
          </div>
      </div>
  </div>
`)

const usernameEl = must(homePageEl.querySelector<HTMLElement>("#" + USERNAME_ID))
const emailEl = must(homePageEl.querySelector<HTMLElement>('#' + EMAIL_ID))
const genderEl = must(homePageEl.querySelector<HTMLElement>('#' + GENDER_ID))
const projectsCompletedEl = must(homePageEl.querySelector<HTMLElement>('#' + PROJECTS_COMPLETED_ID))
const xpEl = must(homePageEl.querySelector<HTMLElement>('#' + XP_ID))
const levelEl = must(homePageEl.querySelector<HTMLElement>('#' + LEVEL_ID))
const groupMemberListEl = must(homePageEl.querySelector<HTMLElement>('#' + GROUP_MEMBER_LIST_ID))


export function showStats(appEl: HTMLElement) {
  appEl.replaceChildren(homePageEl)
  GetUserData()
}

function getUserData() {
    
}
