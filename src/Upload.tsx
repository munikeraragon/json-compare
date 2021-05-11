import { useCallback } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';


export interface Obj {
    [propName: string]: any;
};

export interface UploadProps {
    color: string;
    setData: (obj: Obj) => void
}

export const Upload: React.FC<UploadProps> = ({ color, setData }) => {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {

        if (acceptedFiles.length === 1) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                try {
                    const obj = JSON.parse(String(reader.result));
                    setData(obj);
                } catch (err) {
                    setData({InvalidJSON: "Make sure that the uploaded file has a valid JSON format"})
                }
            }
            reader.readAsText(file)
        }        
      }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div
                className={`flex justify-center items-center ${
                    color === 'primary' ? 'bg-red-500' : 'bg-indigo-500'
                }
             text-white h-8 w-60 m-auto rounded-xl my-2`}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    <path d='M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z' />
                </svg>
                <p className='text-md font-semibold'>Drag 'n' drop or click</p>
            </div>
        </div>
    );
};