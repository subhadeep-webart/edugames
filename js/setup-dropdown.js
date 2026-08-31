// Trivia-SmackDown — Game Setup (index.html)
// Progressive enhancement: turns each `.tsd-select-wrap > select.tsd-control`
// into a custom-styled listbox. The original <select> stays in the DOM
// (visually hidden, not removed) so id-based lookups like
// document.getElementById("s0").value used elsewhere keep working unchanged.

(function () {
  "use strict";

  function enhanceSelect(wrap) {
    const select = wrap.querySelector("select.tsd-control");
    if (!select) return;

    wrap.classList.add("is-enhanced");

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "tsd-select-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    if (select.id) trigger.setAttribute("aria-labelledby", select.id + "-label");

    const listbox = document.createElement("ul");
    listbox.className = "tsd-select-listbox";
    listbox.setAttribute("role", "listbox");
    listbox.tabIndex = -1;

    const fadeTop = document.createElement("li");
    fadeTop.className = "tsd-select-scroll-fade tsd-select-scroll-fade--top";
    fadeTop.setAttribute("aria-hidden", "true");
    listbox.appendChild(fadeTop);

    const optionEls = Array.from(select.options).map(function (opt, i) {
      const li = document.createElement("li");
      li.className = "tsd-select-option";
      li.setAttribute("role", "option");
      li.dataset.index = String(i);
      li.textContent = opt.textContent;
      if (opt.selected) li.classList.add("is-selected");
      listbox.appendChild(li);
      return li;
    });

    const fadeBottom = document.createElement("li");
    fadeBottom.className = "tsd-select-scroll-fade tsd-select-scroll-fade--bottom";
    fadeBottom.setAttribute("aria-hidden", "true");
    listbox.appendChild(fadeBottom);

    function updateScrollCues() {
      const canScrollUp = listbox.scrollTop > 1;
      const canScrollDown =
        listbox.scrollTop + listbox.clientHeight < listbox.scrollHeight - 1;
      wrap.classList.toggle("can-scroll-up", canScrollUp);
      wrap.classList.toggle("can-scroll-down", canScrollDown);
    }

    listbox.addEventListener("scroll", updateScrollCues, { passive: true });

    function syncTriggerLabel() {
      trigger.textContent = select.options[select.selectedIndex]
        ? select.options[select.selectedIndex].textContent
        : "";
    }

    function setActive(index) {
      optionEls.forEach(function (li, i) {
        li.classList.toggle("is-active", i === index);
      });
      const active = optionEls[index];
      if (active) active.scrollIntoView({ block: "nearest" });
    }

    function selectIndex(index, opts) {
      const silent = opts && opts.silent;
      select.selectedIndex = index;
      optionEls.forEach(function (li, i) {
        li.classList.toggle("is-selected", i === index);
      });
      syncTriggerLabel();
      setActive(index);
      if (!silent) select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function openList() {
      if (wrap.classList.contains("is-open")) return;
      wrap.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      setActive(select.selectedIndex);
      updateScrollCues();
    }

    function closeList() {
      if (!wrap.classList.contains("is-open")) return;
      wrap.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }

    function toggleList() {
      if (wrap.classList.contains("is-open")) closeList();
      else openList();
    }

    trigger.addEventListener("click", toggleList);

    trigger.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openList();
      } else if (e.key === "Escape") {
        closeList();
      }
    });

    listbox.addEventListener("keydown", function (e) {
      const current = optionEls.findIndex(function (li) {
        return li.classList.contains("is-active");
      });
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive(Math.min(optionEls.length - 1, current + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive(Math.max(0, current - 1));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (current >= 0) selectIndex(current);
        closeList();
        trigger.focus();
      } else if (e.key === "Escape") {
        closeList();
        trigger.focus();
      } else if (e.key === "Tab") {
        closeList();
      }
    });

    optionEls.forEach(function (li, i) {
      li.addEventListener("click", function () {
        selectIndex(i);
        closeList();
        trigger.focus();
      });
      li.addEventListener("mouseenter", function () {
        setActive(i);
      });
    });

    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) closeList();
    });

    select.addEventListener("change", function () {
      selectIndex(select.selectedIndex, { silent: true });
    });

    syncTriggerLabel();
    wrap.appendChild(trigger);
    wrap.appendChild(listbox);
  }

  function init() {
    document.querySelectorAll(".tsd-select-wrap").forEach(enhanceSelect);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
