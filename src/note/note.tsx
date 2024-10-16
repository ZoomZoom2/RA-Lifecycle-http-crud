import './note.css'
import CustomButton from "../button/customButton.tsx";

type Props = {
    noteText: string,
    onRemove: Function
}

export default function Note({noteText, onRemove}: Props) {

    return (
        <div className="note">
            <span className="noteText">{noteText}</span>
            <CustomButton imageSrc="xmark-solid (1).svg" imageAlt="delete note" addClass="removeNoteBtn"
                          onClick={() => onRemove.call(null)}/>
        </div>
    )
}