(() => {
const { PLACES, PAPERS, RESEARCH_AREAS, MILESTONES } = window.PORTFOLIO_DATA;

const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

function externalLinks(links = []) {
  return links
    .map(
      (link) =>
        `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)} ↗</a>`,
    )
    .join("");
}

function renderTimeline() {
  const currentYear = Math.max(2026, new Date().getFullYear());
  const years = Array.from(
    { length: currentYear - 2017 + 1 },
    (_, index) => currentYear - index,
  ).filter(
    (year) =>
      PAPERS.some((paper) => paper.year === year) ||
      MILESTONES.some((event) => event.year === year),
  );
  const rail = document.querySelector("#rail-years");
  rail.innerHTML = years
    .map(
      (year) =>
        `<button class="rail-year" type="button" data-year="${year}" aria-label="Jump to ${year}">${year}</button>`,
    )
    .join("");

  const eventCard = (item) => `<article class="event-card">
    <div class="event-top"><span class="event-type ${escapeHTML(item.type.toLowerCase())}">${escapeHTML(item.type)}</span><span class="event-date">${escapeHTML(item.date)}</span></div>
    <h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.detail)}</p>${externalLinks(item.links)}
  </article>`;
  document.querySelector("#timeline-events").innerHTML = years
    .map((year) => {
      const research = PAPERS.filter((paper) => paper.year === year).map(
        (paper) => ({
          type: "Research",
          date: paper.venue,
          title: paper.title,
          detail: paper.authors,
          links: paper.links.filter(
            (link) => link.label === "Paper" || link.label === "Proceedings",
          ),
        }),
      );
      const milestones = MILESTONES.filter((event) => event.year === year);
      const categories = [
        { key: "research", label: "Research", items: research },
        {
          key: "career",
          label: "Career",
          items: milestones.filter((event) => event.type === "Career"),
        },
        {
          key: "education",
          label: "Education",
          items: milestones.filter((event) => event.type === "Education"),
        },
        {
          key: "award",
          label: "Awards",
          items: milestones.filter((event) => event.type === "Award"),
        },
      ];
      const lanes = categories
        .filter((category) => category.items.length)
        .map(
          (category) =>
            `<div class="timeline-column timeline-column--${category.key}"><h4 class="timeline-column-heading">${category.label}</h4><div class="timeline-card-list">${category.items.map(eventCard).join("")}</div></div>`,
        )
        .join("");
      return `<section class="timeline-year" id="year-${year}" data-year="${year}" aria-labelledby="heading-${year}">
      <div class="year-heading"><h3 id="heading-${year}">${year}</h3><span>${year === currentYear ? "PRESENT" : ""}</span></div>
      <div class="timeline-track">${lanes}</div>
    </section>`;
    })
    .join("");

  rail.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-year]");
    if (button)
      document.querySelector(`#year-${button.dataset.year}`).scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
  });

  const groups = [...document.querySelectorAll(".timeline-year")];
  const buttons = [...document.querySelectorAll(".rail-year")];
  let activeYear = null;
  function updateActiveYear() {
    const target = window.innerHeight * 0.42;
    let closest = groups[0];
    let distance = Infinity;
    for (const group of groups) {
      const box = group.getBoundingClientRect();
      const nearestPoint = Math.max(box.top, Math.min(target, box.bottom));
      const delta = Math.abs(nearestPoint - target);
      if (delta < distance) {
        closest = group;
        distance = delta;
      }
    }
    const year = Number(closest.dataset.year);
    if (year === activeYear) return;
    activeYear = year;
    groups.forEach((group) =>
      group.classList.toggle("active", Number(group.dataset.year) === year),
    );
    buttons.forEach((button) => {
      const active = Number(button.dataset.year) === year;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "date");
      else button.removeAttribute("aria-current");
    });
    document.querySelector("#rail-progress-fill").style.height =
      `${((currentYear - year) / (currentYear - 2017)) * 100}%`;
    if (window.innerWidth <= 760) {
      const button = buttons.find((item) => Number(item.dataset.year) === year);
      rail.scrollTo({
        left:
          button.offsetLeft -
          rail.offsetLeft -
          rail.clientWidth / 2 +
          button.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }
  window.addEventListener("scroll", updateActiveYear, { passive: true });
  window.addEventListener("resize", updateActiveYear);
  updateActiveYear();
}

function renderPapers() {
  const paperById = new Map(PAPERS.map((paper) => [paper.id, paper]));
  const map = document.querySelector("#knowledge-map");
  const focus = document.querySelector("#paper-focus");

  map.innerHTML = RESEARCH_AREAS.map(
    (area) => `<section class="knowledge-area knowledge-area--${escapeHTML(area.id)}" data-area="${escapeHTML(area.id)}" aria-labelledby="area-${escapeHTML(area.id)}">
      <div class="knowledge-area-meta"><span>${escapeHTML(area.period)}</span><span>${area.papers.length} ${area.papers.length === 1 ? "work" : "works"}</span></div>
      <h3 id="area-${escapeHTML(area.id)}">${escapeHTML(area.title)}</h3>
      <p>${escapeHTML(area.question)}</p>
      <div class="knowledge-nodes">${area.papers
        .map((item) => {
          const paper = paperById.get(item.id);
          return `<button class="knowledge-node" type="button" data-paper="${escapeHTML(item.id)}" aria-controls="paper-focus" aria-pressed="false" title="${escapeHTML(paper.title)}"><span class="knowledge-node-dot" aria-hidden="true"></span><span>${escapeHTML(item.label)}</span><small>${paper.year}</small></button>`;
        })
        .join("")}</div>
    </section>`,
  ).join("");

  function selectPaper(id, reveal = false) {
    const paper = paperById.get(id);
    if (!paper) return;
    const area = RESEARCH_AREAS.find((item) =>
      item.papers.some((entry) => entry.id === id),
    );
    map.querySelectorAll(".knowledge-node").forEach((node) => {
      const active = node.dataset.paper === id;
      node.classList.toggle("is-active", active);
      node.setAttribute("aria-pressed", active);
    });
    map.querySelectorAll(".knowledge-area").forEach((node) =>
      node.classList.toggle("is-active", node.dataset.area === area.id),
    );
    focus.dataset.area = area.id;
    focus.innerHTML = `<div class="paper-focus-meta"><span>SELECTED PUBLICATION</span><span>${escapeHTML(paper.year)} · ${escapeHTML(paper.venue)}</span></div>
      <span class="paper-focus-symbol" aria-hidden="true">${escapeHTML(area.period)}</span>
      <h3>${escapeHTML(paper.title)}</h3>
      <p class="paper-focus-authors">${escapeHTML(paper.authors)}</p>
      <div class="paper-focus-area"><span>RESEARCH AREA</span><strong>${escapeHTML(area.title)}</strong><p>${escapeHTML(area.question)}</p></div>
      <div class="paper-focus-links">${externalLinks(paper.links)}</div>`;
    if (reveal && window.innerWidth < 960)
      focus.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "nearest",
      });
  }

  map.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-paper]");
    if (button) selectPaper(button.dataset.paper, true);
  });
  selectPaper("self-correction");

}

function renderPlaces() {
  const list = document.querySelector("#place-list");
  const card = document.querySelector("#place-card");
  const popup = document.querySelector("#map-popup");
  const svg = d3.select("#globe").attr("viewBox", "0 0 600 600");
  let selected = PLACES[0];
  let popupOpen = false;
  let world = null;
  let nextFrame = null;

  list.innerHTML = PLACES.map(
    (place) =>
      `<button class="place-tab" type="button" data-place="${escapeHTML(place.id)}"><span>${escapeHTML(place.name)}</span><small>${escapeHTML(place.year)}</small></button>`,
  ).join("");

  const defs = svg.append("defs");
  const ocean = defs.append("radialGradient").attr("id", "ocean-gradient");
  ocean.append("stop").attr("offset", "0%").attr("stop-color", "#2d5864");
  ocean.append("stop").attr("offset", "72%").attr("stop-color", "#193d4b");
  ocean.append("stop").attr("offset", "100%").attr("stop-color", "#0b2432");
  const projection = d3
    .geoOrthographic()
    .translate([300, 300])
    .scale(263)
    .clipAngle(90)
    .precision(0.45)
    .rotate([-104, -13]);
  const path = d3.geoPath(projection);
  const sphere = svg
    .append("path")
    .datum({ type: "Sphere" })
    .attr("fill", "url(#ocean-gradient)")
    .attr("stroke", "#bfd2be")
    .attr("stroke-width", 2);
  const land = svg.append("path").attr("class", "globe-land");
  const stems = svg.append("g").attr("class", "marker-stems");
  const markers = svg.append("g").attr("class", "globe-markers");

  function markerPositions(places) {
    const nodes = places.map((place) => {
      const [x, y] = projection(place.coordinates);
      return { place, originX: x, originY: y, x, y };
    });
    for (let round = 0; round < 16; round++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          let dx = a.x - b.x,
            dy = a.y - b.y;
          let distance = Math.hypot(dx, dy);
          if (distance < 32) {
            if (distance < 0.01) {
              dx = (i % 2 ? 1 : -1) * 0.1;
              dy = (j % 2 ? 1 : -1) * 0.1;
              distance = Math.hypot(dx, dy);
            }
            const push = (32 - distance) / 2;
            a.x += (dx / distance) * push;
            a.y += (dy / distance) * push;
            b.x -= (dx / distance) * push;
            b.y -= (dy / distance) * push;
          }
        }
      }
      for (const node of nodes) {
        node.x += (node.originX - node.x) * 0.05;
        node.y += (node.originY - node.y) * 0.05;
        const dx = node.x - 300,
          dy = node.y - 300;
        const radius = Math.hypot(dx, dy);
        if (radius > 254) {
          node.x = 300 + (dx / radius) * 254;
          node.y = 300 + (dy / radius) * 254;
        }
      }
    }
    return nodes;
  }

  function drawGlobe() {
    sphere.attr("d", path);
    if (world) land.attr("d", path(world));
    const center = [-projection.rotate()[0], -projection.rotate()[1]];
    const visible = PLACES.filter(
      (place) => d3.geoDistance(place.coordinates, center) < Math.PI / 2 - 0.03,
    );
    const nodes = markerPositions(visible);
    stems
      .selectAll("line")
      .data(
        nodes.filter(
          (node) =>
            Math.hypot(node.x - node.originX, node.y - node.originY) > 8,
        ),
        (node) => node.place.id,
      )
      .join("line")
      .attr("x1", (node) => node.originX)
      .attr("y1", (node) => node.originY)
      .attr("x2", (node) => node.x)
      .attr("y2", (node) => node.y);
    const marker = markers
      .selectAll("g.marker")
      .data(nodes, (node) => node.place.id)
      .join((enter) => {
        const group = enter
          .append("g")
          .attr("class", "marker")
          .attr("role", "button")
          .attr("tabindex", 0);
        group.append("circle").attr("class", "marker-halo").attr("r", 17);
        group.append("circle").attr("class", "marker-dot").attr("r", 7);
        group.append("text").attr("y", -20).attr("text-anchor", "middle");
        group
          .on("click", (_, node) => selectPlace(node.place, false, true))
          .on("keydown", (event, node) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              selectPlace(node.place, false, true);
            }
          });
        return group;
      });
    marker
      .attr("transform", (node) => `translate(${node.x},${node.y})`)
      .attr("aria-label", (node) => `Show ${node.place.name}`)
      .attr("aria-pressed", (node) => node.place.id === selected.id)
      .classed("selected", (node) => node.place.id === selected.id);
    marker
      .select("text")
      .text((node) => node.place.name)
      .attr("display", (node) =>
        node.place.id === selected.id && !popupOpen ? null : "none",
      );
    const selectedNode = nodes.find((node) => node.place.id === selected.id);
    popup.hidden = !popupOpen || !selectedNode;
    if (!popup.hidden) {
      popup.style.left = `${selectedNode.x / 6}%`;
      popup.style.top = `${selectedNode.y / 6}%`;
      popup.classList.toggle("below", selectedNode.y < 125);
    }
  }

  function scheduleDraw() {
    if (nextFrame !== null) return;
    nextFrame = requestAnimationFrame(() => {
      nextFrame = null;
      drawGlobe();
    });
  }

  function focusOn(coordinates) {
    const start = projection.rotate();
    const target = [-coordinates[0], -coordinates[1]];
    const delta = ((target[0] - start[0] + 540) % 360) - 180;
    svg
      .transition()
      .duration(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700,
      )
      .tween("rotate", () => {
        const interpolate = d3.interpolateArray(start, [
          start[0] + delta,
          target[1],
        ]);
        return (time) => {
          projection.rotate(interpolate(time));
          scheduleDraw();
        };
      });
  }

  function selectPlace(place, focus = true, showPopup = true) {
    selected = place;
    popupOpen = showPopup;
    list.querySelectorAll("button").forEach((button) => {
      const active = button.dataset.place === place.id;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active);
    });
    card.innerHTML = `<div class="place-card-image"><img src="${escapeHTML(place.image)}" alt="Illustrative view for ${escapeHTML(place.name)}"></div>
      <div class="place-card-content"><span class="place-card-kicker">${escapeHTML(place.kind)}</span>
      <div class="place-title-row"><h3>${escapeHTML(place.name)}</h3><span>${escapeHTML(place.year)}</span></div>
      <p>${escapeHTML(place.description)}</p><div class="place-tags">${place.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
      <div class="place-credit">Illustrative photo: <a href="${escapeHTML(place.photoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(place.photographer)}</a> · ${escapeHTML(place.license)}</div></div>`;
    popup.innerHTML = `<img src="${escapeHTML(place.image)}" alt=""><span><strong>${escapeHTML(place.name)}</strong><small>${escapeHTML(place.year)} · ${escapeHTML(place.kind)}</small></span><button type="button" aria-label="Close place popup">×</button>`;
    if (focus) focusOn(place.coordinates);
    scheduleDraw();
  }
  list.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-place]");
    if (button)
      selectPlace(PLACES.find((place) => place.id === button.dataset.place));
  });
  popup.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      popupOpen = false;
      popup.hidden = true;
    }
  });
  svg.call(
    d3
      .drag()
      .on("start", () => svg.interrupt())
      .on("drag", (event) => {
        const [longitude, latitude] = projection.rotate();
        projection.rotate([
          longitude + event.dx * 0.35,
          Math.max(-70, Math.min(70, latitude - event.dy * 0.35)),
        ]);
        scheduleDraw();
      }),
  );
  svg.on("keydown", (event) => {
    if (event.target !== svg.node()) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const [longitude, latitude] = projection.rotate();
      projection.rotate([
        longitude + (event.key === "ArrowLeft" ? -16 : 16),
        latitude,
      ]);
      scheduleDraw();
    }
  });
  document.querySelector("#rotate-left").addEventListener("click", () => {
    const [longitude, latitude] = projection.rotate();
    projection.rotate([longitude - 20, latitude]);
    scheduleDraw();
  });
  document.querySelector("#rotate-right").addEventListener("click", () => {
    const [longitude, latitude] = projection.rotate();
    projection.rotate([longitude + 20, latitude]);
    scheduleDraw();
  });
  selectPlace(selected, false, false);
  world = window.WORLD_GEOJSON;
  if (world) scheduleDraw();
  else
    document.querySelector(".globe-hint").textContent =
      "Map outlines unavailable · select a place";
}

document.addEventListener("DOMContentLoaded", () => {
  const copyright = document.querySelector("#copyright-year");
  if (copyright) copyright.textContent = new Date().getFullYear();
  if (document.querySelector("#timeline-events")) renderTimeline();
  if (document.querySelector("#knowledge-map")) renderPapers();
  if (document.querySelector("#globe")) {
    if (window.d3) renderPlaces();
    else
      document.querySelector("#place-card").textContent =
        "The globe could not load. Please refresh the page.";
  }
});
})();
