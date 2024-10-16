import './customButton.css'

type Props = {
    imageSrc: string,
    imageAlt: string,
    addClass?: string,
    onClick?: Function
}

export default function CustomButton({imageSrc, imageAlt, addClass, onClick}: Props) {
    return (
        <button className={`btn ${addClass ? addClass : ""}`}>
            <img className="btnImage" src={imageSrc} alt={imageAlt} onClick={() => onClick?.call(null)}/>
        </button>
    )
}