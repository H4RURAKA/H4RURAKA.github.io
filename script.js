document.addEventListener("DOMContentLoaded", () => {
	const sections = [
		document.getElementById("home"),
		document.getElementById("introduction"),
		document.getElementById("skills"),
		document.getElementById("education-achievements"),
		document.getElementById("contact"),
	];

	let isScrolling;

	let skillsAnimated = false;
	const skillSections = document.querySelectorAll(
		"#skills .skill-percentage"
	);

	//

	function animateSkill(skill, targetWidth, duration) {
		let startWidth = 0;
		const step = (timestamp) => {
			const progress = (timestamp - startTime) / duration;
			const currentWidth = Math.min(
				startWidth + progress * targetWidth,
				targetWidth
			);
			skill.style.width = currentWidth + "%";

			if (currentWidth < targetWidth) {
				window.requestAnimationFrame(step);
			}
		};

		const startTime = performance.now();
		window.requestAnimationFrame(step);
	}

	function animateSkills() {
		skillSections.forEach((skill) => {
			const target = skill.getAttribute("data-target");
			animateSkill(skill, target, 500); // 1초 동안 애니메이션 실행
		});
		skillsAnimated = true;
	}

	function resetSkills() {
		skillSections.forEach((skill) => {
			skill.style.width = "1%";
		});
		skillsAnimated = false;
	}

	//

	window.addEventListener("scroll", () => {
		if (isScrolling) clearTimeout(isScrolling);

		isScrolling = setTimeout(() => {
			let maxVisibleSectionIndex = 0;
			let maxVisibleHeight = 0;

			sections.forEach((section, index) => {
				const rect = section.getBoundingClientRect();
				const visibleHeight =
					Math.min(window.innerHeight, rect.bottom) -
					Math.max(0, rect.top);

				if (visibleHeight > maxVisibleHeight) {
					maxVisibleHeight = visibleHeight;
					maxVisibleSectionIndex = index;
				}
			});

			if (maxVisibleHeight > window.innerHeight / 2) {
				sections[maxVisibleSectionIndex].scrollIntoView({
					behavior: "smooth",
				});

				if (sections[maxVisibleSectionIndex].id === "skills") {
					animateSkills();
				} else {
					setTimeout(resetSkills, 50);
				}
			}
		}, 100); // 스크롤 이벤트가 종료된 후 100ms 뒤에 실행
	});
});

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("nav a").forEach((link) => {
		link.addEventListener("click", function (event) {
			event.preventDefault(); // 기본 앵커 이동 방지

			const section = document.querySelector(this.getAttribute("href"));
			if (section) {
				section.scrollIntoView({ behavior: "smooth" });
			}
		});
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const typingText = "Hello, I am Yoonseo Hwang";
	const typingElement = document.getElementById("typing-effect");
	const subTypingText = "A Student, Aspiring to be a Security Expert.";
	const subTypingElement = document.getElementById("sub-typing-effect");
	let typingIndex = 0;

	function typeSubLetter() {
		if (typingIndex < subTypingText.length) {
			subTypingElement.textContent += subTypingText.charAt(typingIndex);
			typingIndex++;
			setTimeout(typeSubLetter, 50);
		}
	}

	function typeLetter() {
		if (typingIndex < typingText.length) {
			typingElement.textContent += typingText.charAt(typingIndex);
			typingIndex++;
			setTimeout(typeLetter, 100);
		} else {
			typingIndex = 0; // 인덱스 초기화
			typeSubLetter();
		}
	}

	if (typingElement) {
		typeLetter();
	}
});
