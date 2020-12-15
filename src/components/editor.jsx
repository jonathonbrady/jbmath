import MathJax from 'react-mathjax'

const EditorModal = () => {
    
    return (
        <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Edit Element</p>
                    <div class="tag is-warning">
                        <button class="delete" aria-label="close"></button>
                    </div>
                </header>
                <section class="modal-card-body">
                    <MathJax.Provider>
                        <MathJax.Node formula="tep" />
                    </MathJax.Provider>
                </section>
                <footer class="modal-card-foot">
                    <div class="container">
                        <p>dvsnjkfenw</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default EditorModal