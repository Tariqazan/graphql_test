import { useMutation, gql } from "@apollo/client";

const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;