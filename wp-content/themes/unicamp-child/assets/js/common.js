jQuery(document).ready(function($) {
    const menuData = [
      {
        title: "<strong>The School</strong>",
        description: "An overview of the school's history, mission, values, and vision. It outlines the institution's commitment to providing a well-rounded education, fostering personal growth, and preparing students for future success.",
        groups: [
          {
            name: "About SFS",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/principal.jpg", caption: "Meet Our Leaders" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/media-athletics-gallery-01-600x373.jpg", caption: "Give to SFS" }
            ],
            items: [
              { text: "About SFS", link: "https://sn.laksvrddhi.com/about/" },
              { text: "By The Numbers", link: "https://sn.laksvrddhi.com/by-the-numbers/" },
              { text: "History of SFS Guwahati", link: "https://sn.laksvrddhi.com/history-of-sfs-guwahati/" },
              { text: "Policy Manual", link: "https://sn.laksvrddhi.com/policy-manual/" }
            ]
          },
          {
            name: "Administration & Staff",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/media-athletics-gallery-01-600x373.jpg", caption: "Women at SFS" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/1-scaled-1-600x401.jpg", caption: "Our Dedicated Staff" }
            ],
            items: [
              { text: "Administration", link: "https://sn.laksvrddhi.com/administration/" },
              { text: "Meet the Principal", link: "https://sn.laksvrddhi.com/meet-the-principal/" },
              { text: "Staff Members", link: "https://sn.laksvrddhi.com/staff-members/" }
            ]
          },
          {
            name: "Campus & Global Presence",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/aroundbanner-600x267.jpg", caption: "Global Outlook" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/1-scaled-1-600x401.jpg", caption: "Our Collaborations" }
            ],
            items: [
              { text: "SFS Guwahati Campus", link: "https://sn.laksvrddhi.com/sfs-guwahati-campus/" },
              { text: "Our Collaborators", link: "https://sn.laksvrddhi.com/our-collaborators/" },
              { text: "Around The World", link: "https://sn.laksvrddhi.com/around-the-world-2/" },
              { text: "A Walk Through SFS School", link: "https://sn.laksvrddhi.com/a-walk-through-sfs-school/" },
              { text: "Virtual Tour of SFS Guwahati", link: "https://sn.laksvrddhi.com/virtual-tour-of-sfs-guwahati/" }
            ]
          },
          {
            name: "Campus & Activities",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/aroundbanner-600x267.jpg", caption: "Global Outlook" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/1-scaled-1-600x401.jpg", caption: "Our Collaborations" }
            ],
            items: [
              { text: "Campus Life", link: "https://sn.laksvrddhi.com/campus-life/" },
              { text: "Co-Scholastic", link: "https://sn.laksvrddhi.com/co-scholastic/" },
              { text: "Co-Curricular Activities", link: "https://sn.laksvrddhi.com/co-curricular-activities/" }
            ]
          },
          {
            name: "Events & Celebrations",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/aroundbanner-600x267.jpg", caption: "Global Outlook" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/1-scaled-1-600x401.jpg", caption: "Our Collaborations" }
            ],
            items: [
              { text: "Parents Day", link: "https://sn.laksvrddhi.com/parents-day/" },
              { text: "Desalite Fiesta", link: "https://sn.laksvrddhi.com/desalite-fiesta/" },
              { text: "Science Exhibition", link: "https://sn.laksvrddhi.com/science-exhibition/" }
            ]
          },
          {
            name: "Publications & Achievements",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/aroundbanner-600x267.jpg", caption: "Global Outlook" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/1-scaled-1-600x401.jpg", caption: "Our Collaborations" }
            ],
            items: [
              { text: "Publications", link: "https://sn.laksvrddhi.com/publications/" },
              { text: "Students Council", link: "https://sn.laksvrddhi.com/students-council/" },
              { text: "Awards & Achievements", link: "https://sn.laksvrddhi.com/awards-achievements/" },
              { text: "Media Coverages", link: "https://sn.laksvrddhi.com/media-coverages/" }
            ]
          }
        ]
      },
      {
        title: "<strong>Academic</strong>",
        description: "Details the academic programs offered, including curriculum structure, subjects, and teaching methodology...",
        groups: [
          {
            name: "Academic Overview",
            featuredImgs: [
              { src: "https://picsum.photos/600/400?random=207", caption: "Academic Excellence" },
              { src: "https://picsum.photos/600/400?random=208", caption: "Beyond Classrooms" }
            ],
            items: [
              { text: "Overview", link: "https://sn.laksvrddhi.com/overview/" },
              { text: "School Calendar", link: "https://sn.laksvrddhi.com/school-calendar/" },
              { text: "Academic Syllabus", link: "https://sn.laksvrddhi.com/academic-syllabus/" }
            ]
          },
          {
            name: "Faculty & Committees",
            featuredImgs: [{ src: "https://picsum.photos/600/400?random=209", caption: "Exam Success" }],
            items: [
              { text: "Staff Committee", link: "https://sn.laksvrddhi.com/staff-committee/" },
              { text: "Parent Teacher Meet", link: "https://sn.laksvrddhi.com/parent-teacher-meet/" }
            ]
          },
          {
            name: "Student Resources & Facilities",
            featuredImgs: [{ src: "https://picsum.photos/600/400?random=209", caption: "Exam Success" }],
            items: [
              { text: "Academic Results", link: "https://sn.laksvrddhi.com/academic-results/" },
              { text: "Library", link: "https://sn.laksvrddhi.com/library/" },
              { text: "Abacus", link: "https://sn.laksvrddhi.com/abacus/" },
              { text: "Laboratories", link: "https://sn.laksvrddhi.com/laboratories/" }
            ]
          }
        ]
      },
            {
        title: "<strong>Admission</strong>",
        description: "Information on the admission process...",
        groups: [
          {
            name: "Admission Overview",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/principal.jpg", caption: "Join Our Community" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/media-athletics-gallery-01-600x373.jpg", caption: "Admissions at SFS" }
            ],
            items: [
              { text: "Admission Policy", link: "https://sn.laksvrddhi.com/admission-policy/" },
              { text: "Take Admission Here", link: "https://sn.laksvrddhi.com/take-admission-here/" },
              { text: "Admission Syllabus", link: "https://sn.laksvrddhi.com/admission-syllabus/" },
              { text: "Admission Results", link: "https://sn.laksvrddhi.com/admission-results/" }
            ]
          },
          {
            name: "Programs & Opportunities",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/principal.jpg", caption: "Join Our Community" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/media-athletics-gallery-01-600x373.jpg", caption: "Admissions at SFS" }
            ],
            items: [
              { text: "SFS Higher Secondary", link: "https://sn.laksvrddhi.com/sfs-higher-secondary/" },
              { text: "SFS Safe Scholarship Programme", link: "https://sn.laksvrddhi.com/sfs-safe-scholarship-programme/" }
            ]
          },
          {
            name: "Student Essentials",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/principal.jpg", caption: "Join Our Community" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/media-athletics-gallery-01-600x373.jpg", caption: "Admissions at SFS" }
            ],
            items: [
              { text: "Fees", link: "https://sn.laksvrddhi.com/fees/" },
              { text: "Transportation", link: "https://sn.laksvrddhi.com/transportation/" },
              { text: "Uniforms", link: "https://sn.laksvrddhi.com/uniforms/" }
            ]
          },
          {
            name: "Quick Answers for Parents & Students",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/principal.jpg", caption: "Join Our Community" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/media-athletics-gallery-01-600x373.jpg", caption: "Admissions at SFS" }
            ],
            items: [
              { text: "FAQ", link: "https://sn.laksvrddhi.com/faq/" }
            ]
          }
        ]
      },
      {
        title: "<strong>Career</strong>",
        description: "Information about career opportunities...",
        groups: [{
          name: "Opportunities",
          featuredImgs: [{ src: "https://picsum.photos/600/400?random=216", caption: "Join Our Team" }],
          items: [
            { text: "Current Openings", link: "https://recruitment.sfsguwahati.ac.in/career" },
          ]
        }]
      },
      {
        title: "<strong>CBSE Information</strong>",
        description: "St. Francis de Sales (SFS) School in Narengi, Guwahati is a co-educational...",
        groups: [
          {
            name: "Mandatory Documents",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/media-athletics-gallery-01-600x373.jpg", caption: "CBSE Compliance" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/1-scaled-1-600x401.jpg", caption: "Official Disclosures" }
            ],
            items: [
              { text: "Mandatory Public Disclosure", link: "https://sn.laksvrddhi.com/mandatory-public-disclosure/" },
              { text: "Self Affidavit", link: "https://sn.laksvrddhi.com/self-affidavit/" },
              { text: "Self Certification by HOS", link: "https://sn.laksvrddhi.com/self-certification-by-hos/" }
            ]
          },
          {
            name: "Reports & Policies",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/media-athletics-gallery-01-600x373.jpg", caption: "CBSE Compliance" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/1-scaled-1-600x401.jpg", caption: "Official Disclosures" }
            ],
            items: [
              { text: "School Annual Report", link: "https://sn.laksvrddhi.com/school-annual-report/" },
              { text: "Norms Followed For Fixing Fee", link: "https://sn.laksvrddhi.com/norms-followed-for-fixing-fee/" }
            ]
          },
          {
            name: "Student Records & Resources",
            featuredImgs: [
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/media-athletics-gallery-01-600x373.jpg", caption: "CBSE Compliance" },
              { src: "https://sn.laksvrddhi.com/wp-content/uploads/2025/10/1-scaled-1-600x401.jpg", caption: "Official Disclosures" }
            ],
            items: [
              { text: "Enrolment", link: "https://sn.laksvrddhi.com/enrolment/" },
              { text: "Book List", link: "https://sn.laksvrddhi.com/book-list/" },
              { text: "Transfer Certificate", link: "https://sn.laksvrddhi.com/transfer-certificate/" }
            ]
          }
        ]
      },

      {
        title: "<strong>Contact Us</strong>",
        description: "Provides essential contact details...",
        groups: [{
          name: "Reach Out",
          featuredImgs: [{ src: "https://picsum.photos/600/400?random=217", caption: "Contact SFS" }],
          items: [
            { text: "Contact Details", link: "https://sn.laksvrddhi.com/contact/" },
          ]
        }]
      },
      {
        title: "<strong>Community Hub</strong>",
        description: "Covers blog, gallery, and alumni under one collective space.",
        groups: [{
          name: "Explore SFS Highlights",
          featuredImgs: [{ src: "https://picsum.photos/600/400?random=217", caption: "Contact SFS" }],
          items: [
            { text: "Blog", link: "https://sn.laksvrddhi.com/blog" },
            { text: "Gallery", link: "https://sn.laksvrddhi.com/gallery" },
            { text: "Alumni", link: "https://sn.laksvrddhi.com/alumni" },
            { text: "Project Child", link: "https://projectchild.co.in/" },
            { text: "Desalite Connect", link: "https://dc.sfsguwahati.in/" }
          ]
        },
        {
          name: "Reviews from Parents & Students",
          featuredImgs: [{ src: "https://picsum.photos/600/400?random=217", caption: "Reviews" }],
          items: [
            { text: "Reviews", link: "https://sn.laksvrddhi.com/reviews" }
          ]
        }]
      }
    ];

    const $menuList = $("<ul class='custom-menu-list'></ul>");

    menuData.forEach((section, index) => {
        let $li;

        if (section.isLogo) {
            // Special styling for Desalite logo at bottom
            $li = $(`
                <li class="menu-logo-item">
                    <a href="${section.link}" target="_blank" rel="noopener" class="desalite-logo-link">
                        ${section.title}
                    </a>
                </li>
            `);
        } else {
            $li = $(`<li class="menu-text-item">${section.title}</li>`);

            $li.on("mouseenter", function () {
                $(".slide-left").css({
                    "opacity": "1",
                    "background": "#fff",
                    "background-image": "repeating-linear-gradient(-45deg, #f8f8f8 0, #f8f8f8 2px, #ffffff 2px, #ffffff 6px)"
                });

                $("#customMenuItems li").removeClass("active");
                $(this).addClass("active");

                if (section.groups && section.groups.length > 0) {
                    let cleanTitle = section.title.replace(/<\/?strong[^>]*>/g, '').trim();
                    let html = `
                        <div class="ml-2"><h2>${cleanTitle}</h2></div>
                        <p class="ml-2 custom-description">${section.description}</p>
                        <div class="three-col-menu">
                            <div class="right-images"></div>
                            <div class="left-groups"></div>
                            <div class="middle-submenu"></div>
                        </div>
                    `;
                    const $content = $("#menuLeftContent").html(html).addClass("active");
                    const $left = $content.find(".left-groups");
                    const $middle = $content.find(".middle-submenu");
                    const $right = $content.find(".right-images");

                    $left.empty();

                    section.groups.forEach((grp, idx) => {
                        const $g = $(`<div class="group-item" data-group="${idx}">
                            <span>${grp.name}</span>
                            <i class="fa-solid fa-chevron-right arrow"></i>
                        </div>`);
                        $left.append($g);
                    });

                    function renderGroup(idx) {
                        const grp = section.groups[idx];
                        $(".group-item").removeClass("active");
                        $(`.group-item[data-group=${idx}]`).addClass("active");

                        let submenuHTML = grp.items.map((i, index) =>
                            `<a href="${i.link}" class="submenu-link ${index === 0 ? 'active' : ''}">${i.text}</a>`
                        ).join("");
                        $middle.html(submenuHTML).addClass("show");

                        let imagesHTML = (grp.featuredImgs || []).map((img, i) => {
                            const animClasses = i % 2 === 0 ? "" : "anim-fade";
                            const dur = i % 2 === 0 ? 9 : 10;
                            return `
                                <div class="featured-card ${animClasses}" style="--anim-dur:${dur}s;">
                                    <img src="${img.src}" alt="${grp.name}">
                                    <span>${img.caption || ""}</span>
                                </div>
                            `;
                        }).join("");
                        $right.html(imagesHTML);
                    }

                    renderGroup(0);

                    $left.off("mouseenter click", ".group-item").on("mouseenter click", ".group-item", function () {
                        const idx = $(this).data("group");
                        renderGroup(idx);
                    });

                    $middle.off("mouseenter", ".submenu-link").on("mouseenter", ".submenu-link", function () {
                        $middle.find(".submenu-link").removeClass("active");
                        $(this).addClass("active");
                    });
                } else {
                    // Optional: hide panel if no groups
                    $("#menuLeftContent").removeClass("active").html("");
                }
            });
        }

        $menuList.append($li);
    });

    $("#customMenuItems").html($menuList);

    // Open/close menu
    $("#customMenu").on("click", function () {
        $(".slide-menu-overlay").addClass("active");
        document.body.classList.add("menu-open");
    });

    $("#closeMenu, .slide-menu-overlay").on("click", function (e) {
        if (e.target === this || $(e.target).hasClass("slide-menu-overlay")) {
            $(".slide-menu-overlay").removeClass("active");
            document.body.classList.remove("menu-open");
        }
    });
});