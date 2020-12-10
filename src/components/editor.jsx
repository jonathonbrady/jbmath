const EditorModal = () => {
    
    return (
        <div class={`modal ${active}`}>
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Edit Element</p>
                    <div class="tag is-warning">
                        <button class="delete" aria-label="close" onClick={handleDelete}></button>
                    </div>
                </header>
                <section class="modal-card-body">
                    <MathJax.Provider>
                        <MathJax.Node formula={text} />
                    </MathJax.Provider>
                </section>
                <footer class="modal-card-foot">
                    <div class="container">
                        <div class="field has-addons has-addons-centered">
                            <input
                                class="input is-primary is-rounded"
                                type="text"
                                placeholder={formula}
                                value={text}
                                onChange={handleChange}
                            ></input>
                            <button class="button is-success" onClick={handleSave}>Save</button>
                            <button class="button" onClick={handleOpen}>Cancel</button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default EditorModal