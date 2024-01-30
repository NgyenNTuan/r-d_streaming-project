const APP_ID = "6a6bbcb63d9642ec8d71de44edd8ca8a"

let uid = sessionStorage.getItem('uid')
if(!uid){
    uid = String(Math.floor(Math.random() * 10000))
    sessionStorage.setItem('uid', uid)
}

// Nếu dự án của bạn kích hoạt Chứng chỉ ứng dụng để xác thực Mã thông báo, hãy điền giá trị Mã thông báo được tạo tại đây
let token = null;
let client;

let rtmClient;
let channel;

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get('room')

if(!roomId){
    roomId = 'main'
}

let displayName = sessionStorage.getItem('display_name')
if(!displayName){
    window.location = 'index.html'
}

let localTracks = []
let remoteUsers = {}

let localScreenTracks;
let sharingScreen = false;

let joinRoomInit = async () => {
    debugger
    // Tạo và trả về một RtmClient instance
    rtmClient = await AgoraRTM.createInstance(APP_ID)
    // Đăng nhập vào hệ thống Agora RTM
    /**
     * - Nếu bạn sử dụng Agora RTM SDK cùng với Agora RTC SDK, Agora khuyên bạn nên tránh đăng nhập vào hệ thống RTM và tham gia kênh RTC cùng một lúc.
     * - Nếu người dùng đăng nhập bằng cùng một uid từ một phiên bản khác, người dùng sẽ bị loại khỏi thông tin đăng nhập trước đó của bạn và bị xóa 
     * khỏi các kênh đã tham gia trước đó.
     */
    await rtmClient.login({uid,token})

    // Thêm hoặc cập nhật thuộc tính của người dùng cục bộ.
    await rtmClient.addOrUpdateLocalUserAttributes({'name':displayName})

    // Tạo một RtmChannel instance
    channel = await rtmClient.createChannel(roomId)
    // Tham gia một kênh. Sau khi tham gia kênh, người dùng có thể nhận được tin nhắn kênh và thông báo về những người dùng khác tham gia hoặc rời khỏi kênh.
    await channel.join()

    // Lắng nghe các sự kiện, chẳng hạn như người dùng tham gia kênh.
    channel.on('MemberJoined', handleMemberJoined)
    // Người dùng rời kênh
    channel.on('MemberLeft', handleMemberLeft)
    // Nghe tin nhắn kênh.
    channel.on('ChannelMessage', handleChannelMessage)

    // Lấy danh sách thành viên của kênh.
    getMembers()
    addBotMessageToDom(`Welcome to the room ${displayName}! 👋`)

    // Logic mã khởi tạo, bắt buộc. Tạo một đối tượng client cục bộ để quản lý cuộc gọi.
    client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})
    // Cho phép user tham gia một room
    await client.join(APP_ID, roomId, token, uid)

    // Xảy ra khi người dùng từ xa xuất bản bản âm thanh hoặc video.
    client.on('user-published', handleUserPublished)
    // Xảy ra khi người dùng từ xa ngoại tuyến.
    client.on('user-left', handleUserLeft)
    // User join vào
    client.on('user-joined', handleUserJoined)
    // Xảy ra khi người dùng từ xa hủy xuất bản bản âm thanh hoặc video.
    client.on('user-unpublished', handleUserUnPublished)
    client.on('user-info-updated', handleStates1)
    client.on('stream-type-changed', handleStates2)
    client.on('published-user-list', handleStates3)
}

let handleStates1 = async (user, mediaType)=> {
    console.log('stat1', user, mediaType);
}

let handleStates2 = async (user, mediaType)=> {
    console.log('stat2', user, mediaType);
}

let handleStates3 = async (user, mediaType)=> {
    console.log('stat2', user, mediaType);
}

let joinStream = async () => {
    document.getElementById("join-btn").style.display = "none";
    document.getElementsByClassName("stream__actions")[0].style.display =
        "flex";

    var micDevices = AgoraRTC.getMicrophones();
    var cameraDevices = AgoraRTC.getCameras();
    console.log('mic and camera', micDevices, cameraDevices);

    if (cameraDevices.length != undefined && cameraDevices.length != 0) {
        //Tạo một bản nhạc âm thanh và một bản nhạc video.
        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks(
            {},
            {
                encoderConfig: {
                    width: { min: 640, ideal: 1920, max: 1920 },
                    height: { min: 480, ideal: 1080, max: 1080 },
                },
            },
        );
        
        // Phát một bản nhạc đa phương tiện trên trang web.
        localTracks[1].play(`user-${uid}`);
        // Xuất bản các bản âm thanh và/hoặc video cục bộ lên một kênh.
        await client.publish([localTracks[0], localTracks[1]]);
    }
    
    let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                 </div>`;

    document
        .getElementById("streams__container")
        .insertAdjacentHTML("beforeend", player);
    document
        .getElementById(`user-container-${uid}`)
        .addEventListener("click", expandVideoFrame);

    if (localTracks.length != 0) {
    }
}

let switchToCamera = async () => {
    let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                 </div>`
    displayFrame.insertAdjacentHTML('beforeend', player)

    // Gửi hoặc dừng gửi dữ liệu đa phương tiện của bản nhạc.
    await localTracks[0].setMuted(true)
    await localTracks[1].setMuted(true)

    document.getElementById('mic-btn').classList.remove('active')
    document.getElementById('screen-btn').classList.remove('active')

    localTracks[1].play(`user-${uid}`)
    await client.publish([localTracks[1]])
}

let handleUserUnPublished = async (user, mediaType) => {
    console.log('unpublished', user, mediaType)
}

let handleUserJoined = async (user, mediaType) => {
    console.log( 'user joined',user.uid, mediaType, uid);

    let player = `<div class="video__container" id="user-container-${uid}">
    <div class="video-player" id="user-${uid}"></div>
 </div>`;

    document
        .getElementById("streams__container")
        .insertAdjacentHTML("beforeend", player);
    document
        .getElementById(`user-container-${uid}`)
        .addEventListener("click", expandVideoFrame);
}

let handleUserPublished = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    console.log( 'user published',user, mediaType, uid);

    // Đăng ký các bản âm thanh và/hoặc video của người dùng từ xa.
    await client.subscribe(user, mediaType)

    let player = document.getElementById(`user-container-${user.uid}`)
    if(player === null){
        player = `<div class="video__container" id="user-container-${user.uid}">
                <div class="video-player" id="user-${user.uid}"></div>
            </div>`

        document.getElementById('streams__container').insertAdjacentHTML('beforeend', player)
        document.getElementById(`user-container-${user.uid}`).addEventListener('click', expandVideoFrame)
    }

    if(displayFrame.style.display){
        let videoFrame = document.getElementById(`user-container-${user.uid}`)
        videoFrame.style.height = '100px'
        videoFrame.style.width = '100px'
    }

    if(mediaType === 'video'){
        // Phát video từ xa
        user.videoTrack.play(`user-${user.uid}`)
    }

    if(mediaType === 'audio'){
        // Phát âm thanh từ xa
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    console.log('user left')
    delete remoteUsers[user.uid]
    let item = document.getElementById(`user-container-${user.uid}`)
    if(item){
        item.remove()
    }

    if(userIdInDisplayFrame === `user-container-${user.uid}`){
        displayFrame.style.display = null
        
        let videoFrames = document.getElementsByClassName('video__container')

        for(let i = 0; videoFrames.length > i; i++){
            videoFrames[i].style.height = '300px'
            videoFrames[i].style.width = '300px'
        }
    }
}

let toggleMic = async (e) => {
    let button = e.currentTarget

    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        button.classList.add('active')
    }else{
        await localTracks[0].setMuted(true)
        button.classList.remove('active')
    }
}

let toggleCamera = async (e) => {
    let button = e.currentTarget

    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        button.classList.add('active')
    }else{
        await localTracks[1].setMuted(true)
        button.classList.remove('active')
    }
}

let toggleScreen = async (e) => {
    let screenButton = e.currentTarget
    let cameraButton = document.getElementById('camera-btn')

    if(!sharingScreen){
        sharingScreen = true

        screenButton.classList.add('active')
        cameraButton.classList.remove('active')
        cameraButton.style.display = 'none'

        // Tạo một đoạn video để chia sẻ màn hình.
        localScreenTracks = await AgoraRTC.createScreenVideoTrack()

        document.getElementById(`user-container-${uid}`).remove()
        displayFrame.style.display = 'block'

        let player = `<div class="video__container" id="user-container-${uid}">
                <div class="video-player" id="user-${uid}"></div>
            </div>`

        displayFrame.insertAdjacentHTML('beforeend', player)
        document.getElementById(`user-container-${uid}`).addEventListener('click', expandVideoFrame)

        userIdInDisplayFrame = `user-container-${uid}`
        // Chạy video màn hình
        localScreenTracks.play(`user-${uid}`)

        // Hủy xuất bản các bản âm thanh và/hoặc video cục bộ.
        await client.unpublish([localTracks[1]])
        // Xuất bản các bản âm thanh và/hoặc video cục bộ lên một kênh.
        await client.publish([localScreenTracks])

        let videoFrames = document.getElementsByClassName('video__container')
        for(let i = 0; videoFrames.length > i; i++){
            if(videoFrames[i].id != userIdInDisplayFrame){
              videoFrames[i].style.height = '100px'
              videoFrames[i].style.width = '100px'
            }
          }

    }else{
        sharingScreen = false 
        cameraButton.style.display = 'block'
        document.getElementById(`user-container-${uid}`).remove()
        await client.unpublish([localScreenTracks])

        switchToCamera()
    }
}

let leaveStream = async (e) => {
    e.preventDefault()

    document.getElementById('join-btn').style.display = 'block'
    document.getElementsByClassName('stream__actions')[0].style.display = 'none'

    for(let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.unpublish([localTracks[0], localTracks[1]])

    if(localScreenTracks){
        await client.unpublish([localScreenTracks])
    }

    document.getElementById(`user-container-${uid}`).remove()

    if(userIdInDisplayFrame === `user-container-${uid}`){
        displayFrame.style.display = null

        for(let i = 0; videoFrames.length > i; i++){
            videoFrames[i].style.height = '300px'
            videoFrames[i].style.width = '300px'
        }
    }

    // Cho phép người dùng gửi tin nhắn tới tất cả người dùng trong một kênh.
    channel.sendMessage({text:JSON.stringify({'type':'user_left', 'uid':uid})})
}

document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)
document.getElementById('screen-btn').addEventListener('click', toggleScreen)
document.getElementById('join-btn').addEventListener('click', joinStream)
document.getElementById('leave-btn').addEventListener('click', leaveStream)


joinRoomInit()