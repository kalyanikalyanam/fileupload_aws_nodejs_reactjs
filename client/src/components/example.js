// import MediaQuery from 'react-responsive';
//  import React from 'react';
//  import ReactPlayer from 'react-player'

// import { Player } from "video-react";
// const Example = () => (
//     <>
//      <div>
//     <div>Device Test!</div>
//     <MediaQuery minDeviceWidth={1224} values={{ deviceWidth: 1600 }}>
//       <div>You are a desktop or laptop
        
//        <Player>
//       <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
//     </Player>
//       </div>
//       <MediaQuery minDeviceWidth={1824}>
//         <div>You also have a huge screen</div>
//       </MediaQuery>
//       <MediaQuery maxWidth={1224}>
//         <div>You are sized like a tablet or mobile phone though</div>
//       </MediaQuery>
//     </MediaQuery>
//     <MediaQuery maxDeviceWidth={1224}>
//       <div>You are a tablet or mobile phone
//           <Player
//     //   playsInline
//       src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
//     //   fluid={false}
    
//     />
//       </div>
//     </MediaQuery>
//     <MediaQuery orientation="portrait">
//       <div>You are portrait</div>
//     </MediaQuery>
//     <MediaQuery orientation="landscape">
//       <div>You are landscape</div>
//     </MediaQuery>
//     <MediaQuery minResolution="2dppx">
//       <div>You are retina</div>
//     </MediaQuery>
//   </div>
 
// </>    
// );
// export default Example;



import React, { Component } from 'react';
import {Storage} from 'aws-amplify'
import axios from 'axios';

class Example extends Component {
	constructor( props ) {
		super( props );
		this.state = {
		fileUrl:'',
		}
	}
// componentDidMount(){
// Storage.get('/api/profile/profile-img-uploads').then(data =>{this.setstate({
//   fileUrl:data
 
// })
//  console.log(this.state.fileUrl);
// })
// .catch(err=>{
//   console.log("error")
// })
// }
 componentDidMount() {
    axios.get(`http://localhost:5000/api/profile/profile-img-uploads`).then((res) => {
      const posts = res.data;
      console.log(posts);
      this.setState({ posts, loading: true });
    });
  
  }

	render() {
		
		return(
      <>
		<h1>Hi</h1>
		
    </>
		
		);
	}
}

export default Example;