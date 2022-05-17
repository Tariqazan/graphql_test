import React from "react";
import { useMutation, gql } from "@apollo/client";

const SINGLE_UPLOAD = gql`
mutation($file:Upload!){
    createMemo(file:$file){
      memo{
        id
        file
      }
    }
  }
`;

const Parentdiv = {
  height: '50px',
  width: '100%',
  backgroundColor: 'whitesmoke',
  borderRadius: 40,
  margin: 50
}

const Childdiv = {
  height: '100%',
  width: '50',
  backgroundColor: 'red',
  borderRadius: 40,
  textAlign: 'right'
}

const progresstext = {
  padding: 10,
  color: 'black',
  fontWeight: 900
}

const UploadFile = () => {
  const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);
  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => validity.valid && mutate({ variables: { file } });

  if (loading) {
    return (
      <>
        <div style={Parentdiv}>
          <div style={Childdiv}>
            <span style={progresstext}>{`50%`}</span>
          </div>
        </div>
      </>
    )
  };
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
    </React.Fragment>
  );
};


export default UploadFile;