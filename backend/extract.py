import docx
import sys

def main():
    doc = docx.Document('../AI_Compliance_Agent_Assignment.docx')
    with open('assignment.txt', 'w', encoding='utf-8') as f:
        for p in doc.paragraphs:
            f.write(p.text + '\n')

if __name__ == "__main__":
    main()
