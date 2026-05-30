/* =========================
   ELEMENTS
========================= */

const openModalBtn = document.getElementById("btn-open-model");
const heroBtn = document.getElementById("hero-cta");
const closeModalBtn = document.getElementById("btn-close-modal");
const modal = document.getElementById("form-modal");
const form = document.getElementById("idea-form");
const ideasFeed = document.getElementById("ideas-feed");
const loader = document.getElementById("loader");

const titleInput = document.getElementById("idea-title");
const descInput = document.getElementById("idea-description");
const tagsInput = document.getElementById("idea-tags");
const categoryInput = document.getElementById("idea-category");
const ideaIdInput = document.getElementById("idea-id");


/* =========================
   LOCAL STORAGE
========================= */

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];


/* =========================
   OPEN MODAL
========================= */

function openModal() {
    modal.classList.remove("hidden");
}

openModalBtn.addEventListener("click", openModal);
heroBtn.addEventListener("click", openModal);


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {
    modal.classList.add("hidden");
    form.reset();
    ideaIdInput.value = "";
    
    // लाल आउटलाइन को हटाकर नॉर्मल करना
    titleInput.style.border = "";
    descInput.style.border = "";
}

closeModalBtn.addEventListener("click", closeModal);


/* =========================
   CLOSE OUTSIDE
========================= */

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


/* =========================
   SAVE IDEAS
========================= */

function saveIdeas() {
    localStorage.setItem("ideas", JSON.stringify(ideas));
}


/* =========================
   RENDER IDEAS
========================= */

function renderIdeas() {
    ideasFeed.innerHTML = "";

    /* EMPTY STATE */
    if (ideas.length === 0) {
        const empty = document.createElement("h2");
        empty.innerText = "💡 No ideas yet. Be the first one to add!";
        empty.style.textAlign = "center";
        ideasFeed.appendChild(empty);
        return;
    }

    /* LOOP IDEAS */
    ideas.forEach((idea) => {
        /* CARD */
        const card = document.createElement("div");
        card.className = "idea-card";

        /* TITLE */
        const title = document.createElement("h2");
        title.innerText = idea.title;

        /* DESCRIPTION */
        const desc = document.createElement("p");
        desc.innerText = idea.description;

        /* TAGS */
        const tagsWrapper = document.createElement("div");
        tagsWrapper.className = "tags-wrapper";

        idea.tags.forEach((tag) => {
            const tagEl = document.createElement("span");
            tagEl.className = "tag";
            tagEl.innerText = "#" + tag.trim();
            tagsWrapper.appendChild(tagEl);
        });

        /* CATEGORY */
        const category = document.createElement("small");
        category.innerText = "Category : " + idea.category;

        /* ACTIONS */
        const actions = document.createElement("div");
        actions.className = "actions";

        /* LIKE BUTTON */
        const likeBtn = document.createElement("button");
        likeBtn.className = "btn-like";
        likeBtn.dataset.id = idea.id;
        likeBtn.innerText = idea.liked ? `💙 ${idea.likes}` : `👍 ${idea.likes}`;

        /* EDIT BUTTON */
        const editBtn = document.createElement("button");
        editBtn.className = "btn-edit";
        editBtn.dataset.id = idea.id;
        editBtn.innerText = "Edit";

        /* DELETE BUTTON */
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete";
        deleteBtn.dataset.id = idea.id;
        deleteBtn.innerText = "Delete";

        actions.appendChild(likeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        /* COMMENT SECTION */
        const commentSection = document.createElement("div");
        commentSection.className = "comment-section";

        /* COMMENT INPUT */
        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Add a comment...";
        commentInput.className = "comment-input";
        commentInput.dataset.id = idea.id;

        /* COMMENT BUTTON */
        const commentBtn = document.createElement("button");
        commentBtn.innerText = "Comment";
        commentBtn.className = "btn-comment";
        commentBtn.dataset.id = idea.id;

        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentBtn);

        /* COMMENTS WRAPPER */
        const commentsWrapper = document.createElement("div");
        commentsWrapper.className = "comments-wrapper";

        /* COMMENTS LOOP */
        idea.comments.forEach((commentObj, index) => {
            /* COMMENT BOX */
            const commentBox = document.createElement("div");
            commentBox.className = "comment-box";

            /* COMMENT TEXT */
            const commentText = document.createElement("p");
            commentText.className = "comment-text";
            commentText.innerText = commentObj.text;

            /* REPLY BUTTON */
            const showReplyBtn = document.createElement("button");
            showReplyBtn.innerText = "Reply";
            showReplyBtn.className = "show-reply-btn";

            /* REPLY AREA */
            const replyArea = document.createElement("div");
            replyArea.className = "reply-area";
            replyArea.style.display = "none";

            /* REPLY INPUT */
            const replyInput = document.createElement("input");
            replyInput.type = "text";
            replyInput.placeholder = "Add a reply...";
            replyInput.className = "reply-input";

            /* BUTTON WRAPPER */
            const replyBtnsWrapper = document.createElement("div");
            replyBtnsWrapper.className = "reply-btns-wrapper";

            /* CANCEL BUTTON */
            const cancelReplyBtn = document.createElement("button");
            cancelReplyBtn.innerText = "Cancel";
            cancelReplyBtn.className = "cancel-reply-btn";

            /* FINAL REPLY BUTTON */
            const replyBtn = document.createElement("button");
            replyBtn.innerText = "Reply";
            replyBtn.className = "reply-btn";
            replyBtn.dataset.idea = idea.id;
            replyBtn.dataset.comment = index;

            replyBtnsWrapper.appendChild(cancelReplyBtn);
            replyBtnsWrapper.appendChild(replyBtn);

            replyArea.appendChild(replyInput);
            replyArea.appendChild(replyBtnsWrapper);

            /* REPLIES WRAPPER */
            const repliesWrapper = document.createElement("div");
            repliesWrapper.className = "replies-wrapper";

            /* SHOW REPLIES */
            commentObj.replies.forEach((reply) => {
                const replyText = document.createElement("p");
                replyText.className = "reply-text";
                replyText.innerText = "↳ " + reply;
                repliesWrapper.appendChild(replyText);
            });

            commentBox.appendChild(commentText);
            commentBox.appendChild(showReplyBtn);
            commentBox.appendChild(replyArea);
            commentBox.appendChild(repliesWrapper);
            commentsWrapper.appendChild(commentBox);
        });

        card.appendChild(title);
        
        const author = document.createElement("p");
        author.className = "author-text";
        author.innerText = "Posted by : " + (idea.author || "Guest");
        card.appendChild(author);

        card.appendChild(desc);
        card.appendChild(tagsWrapper);
        card.appendChild(category);
        card.appendChild(actions);
        card.appendChild(commentSection);
        card.appendChild(commentsWrapper);
        ideasFeed.appendChild(card);
    });
}


/* =========================
   FORM SUBMIT (WITH RED OUTLINE)
========================= */

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const tags = tagsInput.value.split(",");
    const category = categoryInput.value;

    // पहले पुरानी लाल बॉर्डर हटाएँ
    titleInput.style.border = "";
    descInput.style.border = "";

    let hasError = false;

    // अगर Title खाली है तो बॉर्डर लाल करें
    if (title === "") {
        titleInput.style.border = "2px solid red";
        hasError = true;
    }

    // अगर Description खाली है तो बॉर्डर लाल करें
    if (description === "") {
        descInput.style.border = "2px solid red";
        hasError = true;
    }

    // अगर कोई एरर है, तो यहीं रुक जाओ (फॉर्म सबमिट मत करो)
    if (hasError) {
        return;
    }

    /* EDIT */
    if (ideaIdInput.value !== "") {
        ideas = ideas.map((idea) => {
            if (idea.id === ideaIdInput.value) {
                idea.title = title;
                idea.description = description;
                idea.tags = tags;
                idea.category = category;
            }
            return idea;
        });
    } else {
        const newIdea = {
            id: crypto.randomUUID(),
            author: localStorage.getItem("currentUser") || "Guest",
            title: title,
            description: description,
            tags: tags,
            category: category,
            likes: 0,
            liked: false,
            comments: [],
            time: new Date().toLocaleString()
        };
        ideas.unshift(newIdea);
    }

    saveIdeas();
    renderIdeas();
    closeModal();
});


/* =========================
   EVENT DELEGATION
========================= */

ideasFeed.addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    /* DELETE */
    if (e.target.classList.contains("btn-delete")) {
        ideas = ideas.filter((idea) => {
            return idea.id !== id;
        });
        saveIdeas();
        renderIdeas();
    }

    /* EDIT */
    if (e.target.classList.contains("btn-edit")) {
        const selectedIdea = ideas.find((idea) => {
            return idea.id === id;
        });
        titleInput.value = selectedIdea.title;
        descInput.value = selectedIdea.description;
        tagsInput.value = selectedIdea.tags.join(",");
        categoryInput.value = selectedIdea.category;
        ideaIdInput.value = selectedIdea.id;
        openModal();
    }

    /* LIKE */
    if (e.target.classList.contains("btn-like")) {
        ideas = ideas.map((idea) => {
            if (idea.id === id) {
                idea.liked = !idea.liked;
                if (idea.liked) {
                    idea.likes++;
                } else {
                    idea.likes--;
                }
            }
            return idea;
        });
        saveIdeas();
        renderIdeas();
    }

    /* COMMENT */
    if (e.target.classList.contains("btn-comment")) {
        const input = document.querySelector(`.comment-input[data-id="${id}"]`);

        if (input.value.trim() === "") {
            input.style.border = "2px solid red"; // कमेंट खाली होने पर लाल बॉर्डर
            return;
        }

        ideas = ideas.map((idea) => {
            if (idea.id === id) {
                idea.comments.push({
                    text: input.value,
                    replies: []
                });
            }
            return idea;
        });
        saveIdeas();
        renderIdeas();
    }

    /* SHOW REPLY */
    if (e.target.classList.contains("show-reply-btn")) {
        const replyArea = e.target.nextElementSibling;
        replyArea.style.display = "block";
    }

    /* CANCEL REPLY */
    if (e.target.classList.contains("cancel-reply-btn")) {
        const replyArea = e.target.closest(".reply-area");
        replyArea.style.display = "none";
    }

    /* ADD REPLY */
    if (e.target.classList.contains("reply-btn")) {
        const ideaId = e.target.dataset.idea;
        const commentIndex = e.target.dataset.comment;
        const replyArea = e.target.closest(".reply-area");
        const replyInput = replyArea.querySelector(".reply-input");

        if (replyInput.value.trim() === "") {
            replyInput.style.border = "2px solid red"; // रिप्लाई खाली होने पर लाल बॉर्डर
            return;
        }

        ideas = ideas.map((idea) => {
            if (idea.id === ideaId) {
                idea.comments[commentIndex].replies.push(replyInput.value);
            }
            return idea;
        });
        saveIdeas();
        renderIdeas();
    }
});


/* =========================
   LOADER
========================= */

setTimeout(() => {
    loader.classList.add("hidden");
    ideasFeed.classList.remove("hidden");
    renderIdeas();
}, 500);
