import './App.css'
import React from "react";
import CustomButton from "./button/customButton.tsx";
import Note from "./note/note.tsx";

type Props = {
    url: string
}

class App extends React.Component<Props> {

    state = {
        notes: Array<{ id: number, content: string }>(),
        newNoteText: "",
        nextId: 0
    }

    async componentDidMount() {
        this.setState({notes: await this.loadNotes()})
    }

    async loadNotes() {
        const response = await fetch(this.props.url + '/notes');
        return await response.json()
    }

    async postNote(id: number, content: string) {
        const body = {id, content}
        const response = await fetch(this.props.url + '/notes',
            {method: "POST", body: JSON.stringify(body)});
        if (response.status !== 204) {
            console.log("Error", response.status)
            return false
        }
        return true
    }


    async onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget);
        const content = Object.fromEntries(formdata).note.toString()
        if (!await this.postNote(this.state.nextId, content)) {
            return
        }
        const nextId = this.state.nextId++
        this.setState({
            notes: await this.loadNotes(), newNoteText: "",
            nextId
        })
    }

    onChangeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (e.target.name === "note") {
            this.setState({newNoteText: e.target.value})
        }
    }

    async removeNote(index: number) {
        const response = await fetch(this.props.url + '/notes/' + index, {method: "DELETE"});
        if (response.status !== 204) {
            console.log("Error", response.status)
            return
        }
        this.setState({notes: await this.loadNotes()})
    }

    async reDrawNotes() {
        this.setState({notes: await this.loadNotes()})
    }

    render() {
        return (
            <div className="container">
                <div className="wrp">
                    <div className="titleAndRedrawBtn">
                        <h1>Notes</h1>
                        <CustomButton imageSrc="/rotate-solid.svg" imageAlt="redraw"
                                      onClick={this.reDrawNotes.bind(this)}></CustomButton>
                    </div>
                    <div className="notes">
                        {this.state.notes.map((note) => <Note key={note.id}
                                                              noteText={note.content}
                                                              onRemove={() => this.removeNote(note.id)}/>)}

                    </div>
                    <form onSubmit={this.onFormSubmit.bind(this)} autoComplete="off">
                        <div className="textareaWrp">
                            <label htmlFor="note">New Note</label>
                            <textarea name="note" value={this.state.newNoteText}
                                      onChange={this.onChangeInput.bind(this)} maxLength={200} required/>
                        </div>
                        <CustomButton imageSrc="/paper-plane-solid.svg" imageAlt="add note"
                                      addClass="addNoteBtn"></CustomButton>
                    </form>
                </div>
            </div>
        )
    }
}

export default App
