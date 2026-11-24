const menuBtn = document.getElementById("menu-btn");
const addSectionBtn = document.getElementById("add-section-btn");

const boardBodyEl = document.getElementById("board-body");
const sidebarEl = document.getElementById("nav-bar");
const backdropEl = document.getElementById("sidebar-backdrop");
const navItemsEl = document.querySelectorAll(".nav-items");
const mobileViewport = window.matchMedia("(width < 800px)");


// Load / Set LocalStorage Data
const loadData = () => JSON.parse(localStorage.getItem("data"));

const localData = loadData() || {};

const setData = () => { localStorage.setItem("data", JSON.stringify(localData)) }

// Create Elements

addSectionBtn.addEventListener("click", createNewSection)


// Sidebar mobile: event handlers
syncSidebarAccessibility();
menuBtn.addEventListener("click", toggleSidebar);
backdropEl.addEventListener("click", closeSidebar);
mobileViewport.addEventListener("change", () => { syncSidebarAccessibility(); closeSidebar() });
navItemsEl.forEach((item) => {
    item.addEventListener("click", closeSidebar);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("sidebar-open")) {
        closeSidebar();
        menuBtn.focus();
    }
});

// Sidebar mobile: state and accessibility
function toggleSidebar() {
    const isOpen = document.body.classList.toggle("sidebar-open");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );
    syncSidebarAccessibility();
}

function closeSidebar() {
    document.body.classList.remove("sidebar-open");
    menuBtn.setAttribute("aria-expanded", false);
    menuBtn.setAttribute("aria-label", "Open menu");
    syncSidebarAccessibility();
}

function syncSidebarAccessibility() {
    const isHidden = mobileViewport.matches
        && !document.body.classList.contains("sidebar-open");

    if (isHidden && sidebarEl.contains(document.activeElement)) {
        menuBtn.focus();
    }

    sidebarEl.inert = isHidden;
    sidebarEl.setAttribute("aria-hidden", isHidden);
}

function createNewSection() {

    const newSection =

        `<section class="status-item" aria-labelledby="column-title-1">
          <div class="status-head">
            <h3 class="status-title" id="column-title-1">Column Title</h3>
            <div class="tasks-amount">3</div>
            <button class="icon-btn status-options" type="button"
              aria-label="Column Options">
              <span class="icon light material-symbols-outlined"
                aria-hidden="true">more_vert</span>
            </button>
          </div>

          <div class="task-container">

            <article class="task-item" tabindex="0">

              <div class="task-tags-container">
                <div class="task-tag">Tag-01</div>
              </div>

              <h4 class="task-title">Task No. 1</h4>

              <div class="task-collaborators-container">
                <div class="task-collaborator-icon" aria-hidden="true"></div>
              </div>

              <p class="task-start-date">Aug 15, 2026</p>
            </article>

            <article class="empty-task-item">
              <button class="add-task" type="button">
                <span
                  class="icon light material-symbols-outlined"
                  aria-hidden="true">add</span>
              </button>
            </article>
            
          </div>
        </section>
        `;

    addSectionBtn.insertBefore(newSection, boardBodyEl)


    /*
    `<section class="status-item" aria-labelledby="${columnId}">
        <div class="status-head">
            <h3 class="status-title" id="${columnId}">${columnTitle}</h3>
            <div class="tasks-amount">${taskAmount}</div>
            <button class="icon-btn status-options" type="button"
              aria-label="Column Options">
              <span class="icon light material-symbols-outlined"
                aria-hidden="true">more_vert</span>
            </button>
        </div>

        <div class="task-container">

            <article class="empty-task-item">
              <button class="add-task" type="button">
                <span
                  class="icon light material-symbols-outlined"
                  aria-hidden="true">add</span>
              </button>
            </article>

        </div>

    </section>`
    */
}

function loadSectionsEl() {

}

function getTasks(tasks) {
    return tasks.reduce((content, { taskTitle, tags, collaborators, taskStartDate }) => content + `<article class="task-item" tabindex="0">

        <div class="task-tags-container">
            ${getTagsEl(tags)}
        </div>

        <h4 class="task-title" aria-hidden="true">${taskTitle}</h4>

        <div class="task-collaborators-container">
                ${getCollaboratorIconsEl(collaborators)}
        </div>

        <p class="task-start-date">${taskStartDate}</p>
    </article>`, "")
}

function getTagsEl(tags) {

    return tags.reduce((content, { name }) => content + `
        <div class="task-tag">${name}</div>
        `, "")
}

function getCollaboratorIconsEl(collaborators) {

    return collaborators.reduce((content, { profile }) => content + `
        <div class="task-collaborator-icon" aria-hidden="true">
            <img class="collaborator-icon" src="${profile.icon}" alt="${profile.alt}">
        </div>
        `, "")
}

document.querySelector(".teste").innerHTML = getTasks(
    [
        {
            taskTitle: "Task No.01",
            tags: [{
                name: "Tag1"
            },
            {
                name: "Tag2"
            },
            {
                name: "Tag3"
            }],
            collaborators: [
                {
                    profile: {
                        icon: "#",
                        alt: "pfp"
                    }
                },
                {
                    profile: {
                        icon: "#",
                        alt: "pfp"
                    }
                }
            ],

            taskStartDate: "10 de novembro"
        },
        {
            taskTitle: "Task No.02",
            tags: [{
                name: "Tag4"
            },
            {
                name: "Tag5"
            },
            {
                name: "Tag6"
            }],
            collaborators: [
                {
                    profile: {
                        icon: "#",
                        alt: "pfp"
                    }
                },
                {
                    profile: {
                        icon: "#",
                        alt: "pfp"
                    }
                }
            ],

            taskStartDate: "30 de novembro"
        }
    ]
)