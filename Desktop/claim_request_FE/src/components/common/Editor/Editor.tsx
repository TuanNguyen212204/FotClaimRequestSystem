"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import styles from "./Editor.module.css"
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Link, List, ListOrdered, Underline } from "lucide-react"

interface EditorProps {
  initialValue?: string
  placeholder?: string

}

const Editor: React.FC<EditorProps> = ({ initialValue = "", placeholder = "Start typing..." }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [linkUrl, setLinkUrl] = useState<string>("")
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false)
  const [isItalic, setIsItalic] = useState<boolean>(false)
  const [isBold, setIsBold] = useState<boolean>(false)
  const [isUnderline, setIsUnderline] = useState<boolean>(false)
  const [isAlignLeft, setIsAlignLeft] = useState<boolean>(false)
  const [isAlignCenter, setIsAlignCenter] = useState<boolean>(false)
  const [isAlignRight, setIsAlignRight] = useState<boolean>(false)
  const [isList, setIsList] = useState<boolean>(false)
  const [isListOrdered, setIsListOrdered] = useState<boolean>(false)

  useEffect(() => {
    const checkFormatting = () => {
      setIsBold(document.queryCommandState('bold'));
      setIsItalic(document.queryCommandState('italic'));
      setIsUnderline(document.queryCommandState('underline'));
      setIsList(document.queryCommandState('insertUnorderedList'));
      setIsListOrdered(document.queryCommandState('insertOrderedList'));
      setIsAlignLeft(document.queryCommandState('justifyLeft'));
      setIsAlignCenter(document.queryCommandState('justifyCenter'));
      setIsAlignRight(document.queryCommandState('justifyRight'));
    };

    const handleSelectionChange = () => {
      checkFormatting();
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    if (editorRef.current) {
      editorRef.current.addEventListener('click', checkFormatting);
      editorRef.current.addEventListener('keyup', checkFormatting);
    }

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      if (editorRef.current) {
        editorRef.current.removeEventListener('click', checkFormatting);
        editorRef.current.removeEventListener('keyup', checkFormatting);
      }
    };
  }, []);

  const formatText = (command: string, value = ""): void => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    setTimeout(() => {
      setIsBold(document.queryCommandState('bold'));
      setIsItalic(document.queryCommandState('italic'));
      setIsUnderline(document.queryCommandState('underline'));
      setIsList(document.queryCommandState('insertUnorderedList'));
      setIsListOrdered(document.queryCommandState('insertOrderedList'));
      setIsAlignLeft(document.queryCommandState('justifyLeft'));
      setIsAlignCenter(document.queryCommandState('justifyCenter'));
      setIsAlignRight(document.queryCommandState('justifyRight'));
    }, 0);
  }

  const handleList = (): void => {
    formatText("insertUnorderedList");
  }

  const handleListOrdered = (): void => {
    formatText("insertOrderedList");
  }

  const handleAlignLeft = (): void => {
    formatText("justifyLeft");
  }

  const handleAlignCenter = (): void => {
    formatText("justifyCenter");
  }

  const handleAlignRight = (): void => {
    formatText("justifyRight");
  }

  const handleBold = (): void => {
    formatText("bold");
  }

  const handleItalic = (): void => {
    try {
      console.log("italic button clicked")
      console.log(isItalic)
      formatText("italic");
    } catch (error) {
      console.log(error)
    }    
  }

  const handleUnderline = (): void => {
    formatText("underline");
  }

  const handleInsertLink = (): void => {
    if (linkUrl) {
      formatText("createLink", linkUrl);
      setLinkUrl("");
      setShowLinkInput(false);
    }
  }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <button className={`${styles.toolbarButton} ${isBold ? styles.active : ""}`} onClick={handleBold} title="Bold" type="button">
          <Bold size={18} />
        </button>
        <button className={`${styles.toolbarButton} ${isItalic ? styles.active : ""}`} onClick={handleItalic} title="Italic" type="button">
          <Italic size={18} />
        </button>
        <button
          className={`${styles.toolbarButton} ${isUnderline ? styles.active : ""}`}
          onClick={handleUnderline}
          title="Underline"
          type="button"
        >
          <Underline size={18} />
        </button>
        <div className={styles.divider}></div>
        <button
          className={`${styles.toolbarButton} ${isList ? styles.active : ""}`}
          onClick={handleList}
          title="Bullet List"
          type="button"
        >
          <List size={18} />
        </button>
        <button
          className={`${styles.toolbarButton} ${isListOrdered ? styles.active : ""}`}
          onClick={handleListOrdered}
          title="Numbered List"
          type="button"
        >
          <ListOrdered size={18} />
        </button>
        <div className={styles.divider}></div>
        <button
          className={`${styles.toolbarButton} ${isAlignLeft ? styles.active : ""}`}
          onClick={handleAlignLeft}
          title="Align Left"
          type="button"
        >
          <AlignLeft size={18} />
        </button>
        <button
          className={`${styles.toolbarButton} ${isAlignCenter ? styles.active : ""}`}
          onClick={handleAlignCenter}
          title="Align Center"
          type="button"
        >
          <AlignCenter size={18} />
        </button>
        <button
          className={`${styles.toolbarButton} ${isAlignRight ? styles.active : ""}`}
          onClick={handleAlignRight}
          title="Align Right"
          type="button"
        >
          <AlignRight size={18} />
        </button>
        <div className={styles.divider}></div>
        <button
          className={`${styles.toolbarButton} ${showLinkInput ? styles.active : ""}`}
          onClick={() => setShowLinkInput(!showLinkInput)}
          title="Insert Link"
          type="button"
        >
          <Link size={18} />
        </button>

        {showLinkInput && (
          <div className={styles.linkInput}>
            <input
              type="text"
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkUrl(e.target.value)}
            />
            <button onClick={handleInsertLink} type="button">
              Insert
            </button>
          </div>
        )}
      </div>

      <div
        className={styles.editorContent}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: initialValue }}
        data-placeholder={placeholder}
      ></div>
    </div>
  )
}

export default Editor