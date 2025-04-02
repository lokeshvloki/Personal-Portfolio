document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const projects = document.querySelectorAll(".project");

    const updateActiveLink = () => {
        let index = sections.length;
        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
        navLinks.forEach(link => link.classList.remove("active"));
        if (index >= 0) navLinks[index].classList.add("active");
    };

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                navLinks.forEach(link => link.classList.remove("active"));
                link.classList.add("active");
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Adjusted offset for accuracy
                    behavior: "smooth"
                });
            }
        });
    });

    const revealProjects = () => {
        projects.forEach((project, index) => {
            if (project.getBoundingClientRect().top < window.innerHeight - 50) {
                setTimeout(() => project.classList.add("show"), index * 200);
            }
        });
    };

    window.addEventListener("scroll", revealProjects);
    revealProjects();

    // Removed the image swapping code to keep project images static
    // The following block has been removed:
    /*
    document.querySelectorAll(".project-img img").forEach((img, index) => {
        const images = [`images/project${index + 1}_1.jpg`, `images/project${index + 1}_2.jpg`];
        let currentImageIndex = 0;

        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            img.src = images[currentImageIndex];
        }, 1000);
    });
    */

    if (document.getElementById("map")) {
        const platform = new H.service.Platform({
            apikey: "34joZqd4fP0_QpUtGp0DLBniX-PCY-WbOOLm_G1klLI"
        });

        const defaultLayers = platform.createDefaultLayers();
        const map = new H.Map(
            document.getElementById("map"),
            defaultLayers.vector.normal.map,
            {
                center: { lat: 13.7833, lng: 77.7968 },
                zoom: 14,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        H.ui.UI.createDefault(map, defaultLayers);
        map.addObject(new H.map.Marker({ lat: 33.7756, lng: -84.3963 }));
    }
});