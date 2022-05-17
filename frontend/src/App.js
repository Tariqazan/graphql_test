import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Progressbar from './Progressbar';

const FILE_LIST = gql`
query{
  files{
    id
    file
  }
}
`

const UPLOAD_FILE = gql`
mutation($file:Upload!){
  fileUpload(file:$file){
    success {
      id
      file
    }
  }
}
`;

const CONVERTED_PDF_LIST = gql`
query{
  convertedPdfList{
    id
  }
}
`

const CONVERT_FILE = gql`
mutation ($file: Upload!) {
  fileConvert(file: $file) {
    success
  }
}
`;

function App() {
  const { data: file_list } = useQuery(FILE_LIST)
  const { data: converted_pdf_list } = useQuery(CONVERTED_PDF_LIST)
  const [uploadFile, { loading, data }] = useMutation(UPLOAD_FILE, {
    onCompleted(data) {
      alert("completed")
    },
    refetchQueries: [
      {
        query: FILE_LIST
      }
    ]
  });
  const [fileConvert, { loading: convertFileLoading, data: convertFileData }] = useMutation(CONVERT_FILE, {
    onCompleted(convertFileData) {
      alert("converted")
    },
    refetchQueries: [
      {
        query: CONVERTED_PDF_LIST
      }
    ]
  });
  const { imageUpload } = data || {};
  const { success = false } = imageUpload || {};


  const [progress, setProgress] = useState(0)
  const handleUploadFile = React.useCallback((event) => {
    event.preventDefault();
    const [file] = event.target.files || [];
    if (file) {
      uploadFile({ variables: { file } })
      const intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 100) {
            return prev + 10;
          } else {
            clearInterval(intervalId);
            return 100;
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    };
  },
    [uploadFile]);



  const [convertFileProgress, setConvertFileProgress] = useState(0)
  const handleConvertFile = React.useCallback((event) => {
    event.preventDefault();
    const [file] = event.target.files || [];

    if (file) {
      fileConvert({ variables: { file } })
      const intervalId = setInterval(() => {
        setConvertFileProgress((prev) => {
          if (prev <= 100) {
            return prev + 10;
          } else {
            clearInterval(intervalId);
            return 100;
          }
        });
      }, 500);
      return () => clearInterval(intervalId);
    };
  },
    [fileConvert]);


  return (
    <>
      {loading &&
        <Progressbar bgcolor="blue" progress={progress} height={10} />}
      {success && <Progressbar bgcolor="black" progress='100' height={10} />}
      <label htmlFor="">File Upload</label>
      <input name="fileUpload" type="file" onChange={handleUploadFile} />
      {convertFileLoading &&
        <Progressbar bgcolor="blue" progress={convertFileProgress} height={10} />}
      <label htmlFor="">Upload for converting to Pdf</label>
      <input type="file" name='convertImage' onChange={handleConvertFile} />
      <h1>Files</h1>
      <ul>
        {file_list?.files?.map((file) => (
          <li key={file.id}><a href={`http://127.0.0.1:8000/media/${file.file}`}>{file.file}</a></li>
        ))}
      </ul>
      <h1>Converted PDF</h1>
      <ul>
        {converted_pdf_list?.convertedPdfList?.map((converted_pdf) => (
          <li key={converted_pdf.id}><a href={`http://127.0.0.1:8000/media/converted_files/success_${converted_pdf.id}.pdf`}>{converted_pdf.id}</a></li>
        ))}
      </ul>
    </>
  );
}
export default App;