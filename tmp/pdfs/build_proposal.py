from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'output/pdf/Clinic_Envy_Workflow_Proposal_Janrenzo_Facto.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
navy = colors.HexColor('#173047')
teal = colors.HexColor('#157D86')
gray = colors.HexColor('#52616E')
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleCustom', fontName='Helvetica-Bold', fontSize=23, leading=26, textColor=navy, spaceAfter=9))
styles.add(ParagraphStyle(name='IntroCustom', fontName='Helvetica', fontSize=11, leading=16, textColor=gray, spaceAfter=12))
styles.add(ParagraphStyle(name='BodyCustom', fontName='Helvetica', fontSize=9.5, leading=13, textColor=navy, spaceAfter=6))
styles.add(ParagraphStyle(name='SectionCustom', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=navy, spaceAfter=7))
styles.add(ParagraphStyle(name='SmallCustom', fontName='Helvetica', fontSize=8.5, leading=12, textColor=gray, spaceAfter=5))
story=[]
def p(text, style='BodyCustom'):
    return Paragraph(text, styles[style])
def section(title):
    story.extend([Spacer(1,6), HRFlowable(width='100%', thickness=.65, color=colors.HexColor('#CCD8DF')), Spacer(1,7), p(title,'SectionCustom')])
def bullet(text):
    story.append(Paragraph(text, ParagraphStyle(name='BulletCustom', parent=styles['BodyCustom'], leftIndent=11, firstLineIndent=-9), bulletText=None))
def footer(canvas,doc):
    canvas.setStrokeColor(colors.HexColor('#CCD8DF'))
    canvas.line(48,43,564,43)
    canvas.setFont('Helvetica',8)
    canvas.setFillColor(gray)
    canvas.drawString(48,29,'CLINIC ENVY  |  Workflow proposal by Janrenzo Facto')
    canvas.drawRightString(564,29,str(doc.page))

story.append(p('A clearer workflow.<br/>More dependable delivery.','TitleCustom'))
story.append(p('A practical workflow proposal for Clinic Envy','IntroCustom'))
story.append(p('<b>Prepared for:</b> Christopher Schwarz &nbsp;&nbsp; <b>Prepared by:</b> Janrenzo Facto','SmallCustom'))
story.append(p('Portfolio: <link href="https://janrenz.netlify.app/" color="#157D86">janrenz.netlify.app</link>','SmallCustom'))
section('01  Purpose and contribution')
story.append(p('Christopher, if there is an opportunity for me to return, I would like to support Clinic Envy through website development, graphic design, and video production, while helping keep project work organized and moving forward.'))
story.append(p('This proposal starts with one active project and a simple routine: clear priorities, visible progress, and early communication when something is blocked. It is a starting point we can adapt together to the team\'s current needs.'))
section('02  Keep the tools simple')
rows=[
('Tool','Proposed use'),
('ClickUp','One place for task ownership, priorities, deadlines, checklists, and review feedback. Avoid duplicating the same project tasks in Google Tasks.'),
('Google Drive','Store briefs, source files, and approved deliverables in client folders, linked from the relevant tasks.'),
('Google Chat','Keep urgent communication here initially. Record work requests and decisions in ClickUp so they remain easy to follow.'),
('Production tools','Continue WordPress, GoHighLevel, and existing creative tools where used. GoHighLevel remains the client CRM; ClickUp tracks delivery.'),
('Approved AI tools','Support task breakdowns, draft briefs, documentation, creative variations, and coding. Review outputs before delivery.')]
table=Table([[p(a,'SmallCustom'),p(b,'SmallCustom')] for a,b in rows],colWidths=[104,412],hAlign='LEFT')
table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#EAF2F5')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),6),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#DBE4E9'))]))
story.append(table)
story.append(Spacer(1,8))
story.append(p('Check existing subscriptions and feature availability before adding paid tools. Keep confidential client or patient information out of unapproved AI services.','SmallCustom'))
section('03  Give every task a clear path')
story.append(p('<b>Backlog &gt; Ready &gt; In Progress &gt; Review &gt; Done</b><br/>Use <b>Blocked</b> when work needs access, assets, clarification, or a decision.'))
story.append(p('Organize work by client and project. Each task needs one accountable owner, a specific deliverable, priority, agreed deadline, relevant files, a reviewer, and a clear definition of completion.'))
story.append(p('I would start with no more than two tasks in progress at once. If an urgent request comes in, I would confirm which existing priority should move.'))

story.append(PageBreak())
story.append(p('Putting the workflow<br/>into practice','TitleCustom'))
story.append(p('Consistency first. Add complexity only when it helps.','IntroCustom'))
section('04  My communication commitments')
for text in [
'<b>Agree on priorities:</b> Confirm what matters most before starting the day\'s work.',
'<b>Respond consistently:</b> Acknowledge new requests within one working hour during agreed US working hours, even when completing the work will take longer.',
'<b>Raise blockers early:</b> Explain what is stuck, what I have tried, and what help or decision is needed.',
'<b>Report progress daily:</b> Share completed work and links, items awaiting review, blockers, and next priorities.',
'<b>Finish with care:</b> Mark tasks done only after the required review and delivery checks.']:
    bullet('- '+text)
section('05  A gradual introduction')
for text in [
'<b>Start small:</b> Organize one active project, agree on response expectations, and establish a realistic workload.',
'<b>Make work repeatable:</b> Add practical checklists for website, graphic design, and video tasks. Keep briefs and feedback with each task.',
'<b>Refine what works:</b> Remove unnecessary steps and add simple reminders where useful. Consider moving project conversations into ClickUp once the team is comfortable.',
'<b>Review together:</b> Agree on a check-in date with Christopher and expand only if the approach is helping the team.']:
    bullet('- '+text)
section('06  How we would assess progress')
story.append(p('Review on-time completion, response consistency, early blocker reporting, revision frequency, and how much follow-up Christopher needs to do. Set realistic targets together after observing the initial workload.'))
story.append(p('The aim is clearer accountability and dependable delivery. AI can assist with parts of the work, while ownership, judgment, and quality checks remain my responsibility.'))
section('Suggested next step')
story.append(p('A short conversation about Clinic Envy\'s current needs, whether there is an opportunity for me to contribute again, and which project would benefit most from this approach.'))
story.append(p('<b>Janrenzo Facto</b><br/><link href="https://janrenz.netlify.app/" color="#157D86">janrenz.netlify.app</link>'))
story.append(Spacer(1,7))
story.append(p('Tool references: <link href="https://clickup.com/features" color="#157D86">ClickUp features</link> | <link href="https://help.clickup.com/hc/en-us/articles/14841781940759-Google-Drive-integration" color="#157D86">Google Drive integration</link>. Features depend on the selected plan.','SmallCustom'))
doc=SimpleDocTemplate(str(OUT),pagesize=(612,792),rightMargin=48,leftMargin=48,topMargin=42,bottomMargin=57,title='Clinic Envy | Workflow Proposal',author='Janrenzo Facto')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
reader=PdfReader(str(OUT))
print(f'PDF: {OUT}\nPages: {len(reader.pages)}')
assert len(reader.pages)==2, 'Expected exactly two pages'
text='\n'.join(page.extract_text() for page in reader.pages)
assert '30-day' not in text and 'trial' not in text.lower()
assert 'Christopher Schwarz' in text
print('Text and page-count checks passed.')
