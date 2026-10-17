"""Rebuild the public CV with ReportLab. Requires reportlab and Pillow."""
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = Path("C:/Windows/Fonts")
if (FONTS / "calibri.ttf").exists():
    pdfmetrics.registerFont(TTFont("CV", str(FONTS / "calibri.ttf")))
    pdfmetrics.registerFont(TTFont("CVBold", str(FONTS / "calibrib.ttf")))
    pdfmetrics.registerFontFamily("CV", normal="CV", bold="CVBold", italic="CV", boldItalic="CVBold")
else:
    pdfmetrics.registerFontFamily("CV", normal="Helvetica", bold="Helvetica-Bold", italic="Helvetica-Oblique", boldItalic="Helvetica-BoldOblique")
    # Windows is the authoring environment; use built-in fonts elsewhere.
FONT = "CV" if "CV" in pdfmetrics.getRegisteredFontNames() else "Helvetica"
BOLD = "CVBold" if "CVBold" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Bold"
styles = {
"title": ParagraphStyle("title", fontName=BOLD,fontSize=27,leading=31,textColor=colors.black,spaceAfter=7),
"subtitle": ParagraphStyle("subtitle",fontName=FONT,fontSize=12,leading=16,textColor=colors.black,spaceAfter=9),
"contact": ParagraphStyle("contact",fontName=FONT,fontSize=9.5,leading=14,textColor=colors.HexColor("#39434d"),spaceAfter=3),
"h": ParagraphStyle("heading",fontName=BOLD,fontSize=12,leading=16,textColor=colors.black,spaceBefore=17,spaceAfter=8,keepWithNext=True),
"entry": ParagraphStyle("entry",fontName=BOLD,fontSize=10.5,leading=14,textColor=colors.black,spaceBefore=6,spaceAfter=2,keepWithNext=True),
"body": ParagraphStyle("body",fontName=FONT,fontSize=10.5,leading=14.5,textColor=colors.HexColor("#26313c"),spaceAfter=6),
"small": ParagraphStyle("small",fontName=FONT,fontSize=9.5,leading=13,textColor=colors.HexColor("#44515e"),spaceAfter=5),
}
story=[]
def p(text,kind="body"): story.append(Paragraph(text,styles[kind]))
def heading(text): p(text,"h")
def entry(title,description,meta=None):
    block=[Paragraph(title,styles["entry"])]
    if meta: block.append(Paragraph(meta,styles["small"]))
    block.append(Paragraph(description,styles["body"]))
    story.append(KeepTogether(block))
def link(url,label): return '<link href="'+escape(url)+'" color="#174f42">'+escape(label)+'</link>'

p("Muhammad Kamran Ashraf","title")
p("MPhil Chemistry Researcher | Scientific Software Developer","subtitle")
p("Islamabad, Pakistan | "+link("mailto:chkamran32b@gmail.com","chkamran32b@gmail.com"),"contact")
p(link("https://kamranashraf.is-a.dev","kamranashraf.is-a.dev")+" | "+link("https://github.com/Kamran5H","github.com/Kamran5H")+" | "+link("https://orcid.org/0009-0003-2997-2954","ORCID 0009-0003-2997-2954"),"contact")
p(link("https://www.linkedin.com/in/kamran-ashraf-762a21363/","LinkedIn: kamran-ashraf-762a21363"),"contact")
heading("Research profile")
p("MPhil Chemistry researcher at Quaid-i-Azam University, supervised by Prof. Dr. Safeer Ahmed. Current work focuses on Ce-doped NiCo metal-organic frameworks for electrocatalysis, alongside computational chemistry workflows in Quantum ESPRESSO. Develops scientific software for literature discovery and research workflows, with prior experience teaching chemistry and science.")
heading("Education")
entry("MPhil Chemistry | 2025 - Present","Quaid-i-Azam University, Islamabad. Supervisor: Prof. Dr. Safeer Ahmed.")
entry("BS Chemistry | Completed 2024","University of the Punjab, Lahore.")
entry("Associate Degree in Science | Completed 2022","Govt. Postgraduate College, Okara, affiliated with the University of the Punjab. Subjects: chemistry, physics, and mathematics.")
heading("Research experience")
entry("Ce-doped NiCo metal-organic frameworks | Current MPhil research","Investigating cerium incorporation in NiCo frameworks for electrocatalysis, with oxygen and hydrogen evolution as water-splitting reactions of interest. Using electronic-structure and adsorption questions to connect computational modelling with catalyst behaviour.")
entry("Computational chemistry | Ongoing","Quantum ESPRESSO density functional theory workflows for electronic structure and adsorbate interactions. Research interests also include literature analysis of air-electrode activity and degradation in rechargeable zinc-air systems.")
entry("Green-synthesized calcium oxide nanoparticles | Undergraduate projects","Studied dye-degradation applications under Dr. Imran Din at the School of Chemistry, University of the Punjab, in 2024. Also investigated applications in electrochemical sensing for urea detection under Prof. Dr. Adeel Afzal.")
entry("Copper-supported titanium oxide catalysts | Undergraduate project","Studied synthesis and methyl-orange dye-degradation applications in 2024.")
story.append(PageBreak())
p("Muhammad Kamran Ashraf","subtitle")
p("Scientific software and professional experience","small")
heading("Selected software")
entry("Articles Downloader | Python, SQLite, scholarly APIs","Local literature-discovery application with federated search across nine documented scholarly sources, result preview, relevance filtering, search history, and reference-manager exports. Provider access and available full text determine retrieval coverage.",link("https://github.com/Kamran5H/ArticlesDownloader","github.com/Kamran5H/ArticlesDownloader"))
entry("QAU Kalam | FastAPI, PostgreSQL, Azure","University-focused platform for student conversations, mentorship, and campus information, combining community features in one web application.",link("https://www.qaukalam.me","www.qaukalam.me"))
entry("Subah TaskBook | Electron, JavaScript","Offline daily planner with a focus queue, unfinished-task rollover, local persistence, and a reflective journal.",link("https://github.com/Kamran5H/Subah-TaskBook","github.com/Kamran5H/Subah-TaskBook"))
heading("Teaching and professional experience")
entry("Chemistry Teacher | January 2024 - February 2025","Unique Science Academy, Johar View Campus, Lahore. Taught chemistry to Matric and Intermediate students.")
entry("Science Teacher | 2019 - 2022","The Educators, Noor Campus, Okara. Taught chemistry, physics, and mathematics at Matric level.")
entry("Administrative internship | December 2024","Assisted administrative operations at PAFDA through the Chief Minister Internship Programme.")
heading("Methods and technical skills")
p("<b>Research:</b> Quantum ESPRESSO, density functional theory, electrochemistry, UV-visible and IR spectroscopy, Origin graphing.")
p("<b>Scientific computing:</b> Python, NumPy/SciPy, SQLite, literature APIs, citation exports.")
p("<b>Software:</b> JavaScript/TypeScript, React, Next.js, Electron, FastAPI, HTML/CSS, PostgreSQL/Neon, Git/GitHub Actions, Azure, Playwright.")
heading("Selected recognition and service")
p("First prize in a division-level debate competition, Sahiwal (2021); first prize in a Kalam-e-Iqbal competition, Faisalabad division (2022); first prize in the Naat competition at Pioneer Festival, University of the Punjab (2024).")
p("Supported MPhil admission-test preparation and student scholarship guidance. Participated in student event coordination and literary activities at the University of the Punjab and Quaid-i-Azam University.")
p("Academic records, teaching letters, and references are available on request.","small")

def footer(canvas,doc):
    canvas.saveState()
    canvas.setFont(FONT,8.5)
    canvas.setFillColor(colors.HexColor("#65717b"))
    canvas.drawString(48,30,"Muhammad Kamran Ashraf | Curriculum vitae")
    canvas.drawRightString(letter[0]-48,30,str(doc.page))
    canvas.restoreState()

doc=SimpleDocTemplate(str(ROOT/"public/cv/KAMRAN-ASHRAF-CV.pdf"),pagesize=letter,rightMargin=48,leftMargin=48,topMargin=40,bottomMargin=46,title="Muhammad Kamran Ashraf - Curriculum Vitae",author="Muhammad Kamran Ashraf",subject="Physical chemistry research and scientific software",allowSplitting=1)
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print("Public CV rebuilt.")
