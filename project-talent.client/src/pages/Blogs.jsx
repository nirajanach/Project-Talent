function Blogs() {
  return (
    <>
      <h1>Blog Articles</h1>;
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida,
        risus at dapibus aliquet, elit quam scelerisque tortor, nec accumsan
        eros nulla interdum justo. Pellentesque dignissim, sapien et congue
        rutrum, lorem tortor dapibus turpis, sit amet vestibulum eros mi et
        odio.
      </p>
      <button
        className="btn btn-primary mb-2 me-1"
        data-toggle="modal"
        data-target="#exampleModalCenter"
          >
        New Customer
      </button>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogs;
