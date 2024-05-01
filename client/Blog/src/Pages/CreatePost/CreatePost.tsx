import { Form } from "react-bootstrap";

const CreatePost = () => {
  return (
    <div className="container-sm">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>What's on your mind ?</Form.Label>
          <Form.Control as="textarea" rows={5} />
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreatePost;
