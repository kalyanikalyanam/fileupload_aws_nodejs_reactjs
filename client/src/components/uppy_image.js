
import React, { Component } from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import axios from 'axios';
import { DashboardModal } from '@uppy/react';
 import Webcam from "@uppy/webcam";
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

class UppyImageUpload extends Component {

  constructor(props) {

    super(props);

    this.state = {
      modalOpen: false,
    
    }

   
    this.uppy = Uppy({
      id: 'uppy',
      restrictions: { 
        maxFileSize: 10000000, 
        allowedFileTypes: ['image/*'],
        maxNumberOfFiles: 1,
      },
      autoProceed: false,
      debug: true
    })
    .use(Webcam)
 


	

   this.uppy.use(AwsS3, {
   
  
getUploadParameters (file) {
  	if ( file ) {
  console.log(file.data)
	const data = new FormData();

	
			data.append( 'profileImage', file.data );
			axios.post( '/api/profile/profile-img-upload', data, {
				headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				}
			})
// 				.then( ( response ) => {
// 				console.log(response.data)
				
// 							let fileName = response.data;
// 							console.log( 'filedata', fileName );
						
// 						})
				
				
//           }
  
// })
//   }
	.then( ( response ) => {
					if ( 200 === response.status ) {
						// If file size is larger than expected.
						if( response.data.error ) {
							if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
								alert( 'Max size: 1GB', 'red' );
							} else {
								console.log( response.data );
                              
// If not the given file type
								alert( response.data.error,  );
							}
						} else {
							// Success
							let fileName = response.data;
							console.log( 'filedata', fileName );
							alert( 'File Uploaded sucessfully' );
						}
					}
				}).catch( ( error ) => {
				// If another error
				alert(error,"error")
			});
		} else {
			// if file not selected throw error
			alert( 'Please upload file' );
		}
				
          }
  
})
  }

  componentWillUnmount () {
    this.uppy.close()
  }

  handleOpen = () => {
    this.setState({
      modalOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.handleOpen}>Select Image</button>
        <DashboardModal
          uppy={this.uppy}
          closeModalOnClickOutside
          open={this.state.modalOpen}
          onRequestClose={this.handleClose}
         plugins={["Webcam"]} 
        />
      </div>
    );
  }
}

export default UppyImageUpload;