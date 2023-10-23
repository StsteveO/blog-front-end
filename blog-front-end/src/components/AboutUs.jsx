const AboutUs = () => {
  return (
    <>
      <div className="section is-medium pt-5">
        <div className="contain">
          <div className="content">
            <div className="title">About blogDev</div>
            <div className="subtitle mt-4 block">
              blogDev is one of the final projects in{" "}
              <a
                href="https://www.theodinproject.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                The Odin Project
              </a>;{" "} a free, open source, online resource for learning web development.  
              <br/>
              <br/>
              On the frontend blogDev utilizes React, and Bulma for styling. 
              <br/>
              <br/>
              On the backend blogDev uses Node.js with Express.
              <br/>
              <br/>
              MongoDB is used as the database.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUs;
