import { useState, useEffect, useRef } from 'react';
import '../../assets/css/slide.css';
import StarSet from './StarSet';
import { useMediaQuery } from 'react-responsive';

export default function Slide({name, time, stars, photo, reviewtext, isyelp, slideheightfunc, slideheightvar}) {
    const [localreadvar, setLocalReadVar] = useState(slideheightvar);
    const largerthanmobile = useMediaQuery({query: '(min-width: 480px)'});
    // const tablet = useMediaQuery({query: '(min-width: 768px)'});
    // const laptopsize = useMediaQuery({query: '(min-width: 1024px)'});
    // give each Slide component its own instance of reviewtext
    // const [rtstorage, setRTStorage] = useState(reviewtext)
    // const [slideheightvar, setReadMoreVisible] = useState(false)
    const [ptextalter, setPTextAlter] = useState(reviewtext)
    const [expandText, setExpandText] = useState(false)
    const notInitialRender = useRef(false);
    const [persclientHeight, setPersClientHeight] = useState(null)
    const [isalltextvisible, setIsAllTextVisible] = useState(false)
    
    const reviewTextRef = useRef(null);

    useEffect(() => {
        if (!localreadvar) {
            console.log("localreadvar ran")
            const curcontainer = document.getElementsByClassName('awssld__container')[0];
            const reviewtextel = document.getElementById('reviewtext');
            
            
            const tempEl = document.createElement('p');
            tempEl.innerHTML = reviewtextel.innerHTML;
            tempEl.style.cssText = window.getComputedStyle(reviewtextel).cssText;
            tempEl.style.overflow = 'visible';
            tempEl.style.maxHeight = 'none';
            tempEl.style.position = 'absolute';
            tempEl.style.top = '-9999px';
            document.body.appendChild(tempEl);

            // height of reviewtext is being held down here

            const oldHeight = reviewtextel.clientHeight;
            const newHeight = tempEl.clientHeight;

            document.body.removeChild(tempEl);

            console.log("clientHeight of aswsld__container is:", curcontainer.clientHeight)
            console.log("combination is:", curcontainer.clientHeight - oldHeight + newHeight)

            const slideparentdiv = document.getElementById('slideparent')
            if (curcontainer.clientHeight < slideparentdiv.clientHeight) {
                setPersClientHeight(curcontainer.clientHeight)
                curcontainer.style.height = ((curcontainer.clientHeight + newHeight) * (!largerthanmobile ? 1.09375 : 1)) + "px";
                console.log("new height is:", curcontainer.clientHeight + newHeight)
            }
        }
        else {
            // change height back to normal here
            document.getElementsByClassName('awssld__container')[0].style.height = persclientHeight + "px";
        }
    }, [localreadvar])

    useEffect(() => {
        // const curcontainer = document.getElementsByClassName('awssld__container')[0];

        const tempEl = document.createElement('p');
        tempEl.innerHTML = reviewTextRef.current.innerHTML;
        tempEl.style.cssText = window.getComputedStyle(reviewTextRef.current).cssText;
        tempEl.style.overflow = 'visible';
        tempEl.style.maxHeight = 'none';
        tempEl.style.position = 'absolute';
        tempEl.style.top = '-9999px';
        tempEl.style.lineHeight = '1.4';
        tempEl.style.width = reviewTextRef.current.clientWidth + 'px';
        document.body.appendChild(tempEl);

        // height of reviewtext is being held down here

        const oldHeight = reviewTextRef.current.clientHeight;
        const newHeight = tempEl.clientHeight;

        document.body.removeChild(tempEl);


        // console.log("combination is:", curcontainer.clientHeight - oldHeight + newHeight)


        console.log("oldHeight is:", oldHeight)
        console.log("newHeight is:", newHeight)
        if (oldHeight === newHeight) {
            setIsAllTextVisible(true);
        } else {
            setIsAllTextVisible(false);
        }
        setPersClientHeight(document.getElementsByClassName('awssld__container')[0].clientHeight)
    }, [])

    useEffect(() => {
        // console.log("reviewtext is:", reviewtext)
        // console.log("reviewtext is:", ptextalter)
        if (largerthanmobile) {
            // const heightstorage = document.getElementsByClassName("awssld__wrapper")[0].offsetHeight + document.getElementById("reviewtext").offsetHeight - (2.5 * document.getElementById("topdiv").offsetHeight) + "px";
            // document.getElementsByClassName("awssld--foldOutAnimation")[0].style.height = heightstorage;
            // document.getElementsByClassName("awssld--active")[0].style.height = heightstorage;
        }
    }, [reviewtext])

    useEffect(() => {
        if (notInitialRender.current) {
            if (!slideheightvar) {
                setPTextAlter(reviewtext);
                setExpandText(true);
            }
        }
        else {
            notInitialRender.current = true;
        }
    }, [slideheightvar])

    // use useffect to scroll to bottom of page when ptextalter.expand is true

    useEffect(() => {
        if (expandText) {
            // console.log("initial organic height:", document.getElementsByClassName("awssld--foldOutAnimation")[0].offsetHeight)
            console.log("initial wrapper height:", document.getElementsByClassName("awssld__wrapper")[0].offsetHeight)
            console.log("initial reviewtext height:", document.getElementById("reviewtext").offsetHeight)
            // document.getElementsByClassName("awssld--foldOutAnimation")[0].style.height = document.getElementsByClassName("awssld__wrapper")[0].offsetHeight + document.getElementById("reviewtext").offsetHeight - (2.5 * document.getElementById("topdiv").offsetHeight) + "px";
            console.log("new organic height:", document.getElementsByClassName("awssld--foldOutAnimation")[0].offsetHeight)
            // scroll to the bottom of the page
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [expandText])


    return (
        <div id="slideparent">
            <div id="topdiv" style={{marginBottom: isyelp && '0.5rem'}}>
                <img src={photo} id="topdivimg" style={{borderRadius: isyelp && '2rem', width: isyelp && '2.25rem', height: isyelp && '2.25rem'}} 
                    referrerPolicy="no-referrer" alt=""
                />
                <div id="namestarts">
                    <p>{name}</p>
                    <div id="starsnname">
                        <span id='slidestars'>
                            {isyelp ?
                                <img src={require(`../../assets/icons/regular_${stars}@3x.png`)} style={{width: '6.25rem'}} alt='' />
                            :
                                <StarSet num={stars} />
                            }
                        </span>
                        <span id='timedisplay'>
                            {time}
                        </span>
                    </div>
                </div>
            </div>
            <div id="reviewtextbox" style={{height: !localreadvar && 'auto'}}>
                <p id="reviewtext" className='reviewtext' ref={reviewTextRef} style={{overflow: !localreadvar ? 'visible' : 'hidden', 
                    maxHeight: !localreadvar ? '100%' : '67px'
                }}>
                    {largerthanmobile ? reviewtext : ptextalter}
                </p>
                <button id='readmore' className='readmore' style={{display: !isalltextvisible ? 'inline-block' : 'none'}} onClick={() => {
                    setLocalReadVar(!localreadvar);
                    slideheightfunc()
                    // Get the target element
                    const targetElement = document.getElementsByClassName('gaUYjb')[0];
                    console.log("targetElement is:", targetElement)
                    // // Scroll to the target element with smooth animation
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }}>
                    {!localreadvar ? "Hide" : "Read more"}
                </button>
                <div className="gaUYjb" target="_blank" rel="noopener noreferrer nofollow">
                    <div className="ReviewPostedOn__LogoStyle-sc-1s508wm-2 bikRDn">
                        <div className="ReviewPostedOn__Label-sc-1s508wm-5 eCIWIG">Posted on</div>
                        {!isyelp ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 36" className="injected-svg" datasrc="https://static.elfsight.com/icons/google-logo-multicolor.svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g fill="none"><path fill="#4285F4" d="M20.82 13.829h-9.86v2.926h6.994c-.346 4.104-3.76 5.854-6.983 5.854-4.123 0-7.72-3.244-7.72-7.791 0-4.43 3.43-7.841 7.73-7.841 3.317 0 5.272 2.115 5.272 2.115l2.05-2.122s-2.63-2.928-7.427-2.928C4.767 4.042.042 9.197.042 14.765c0 5.457 4.445 10.777 10.989 10.777 5.755 0 9.968-3.943 9.968-9.773 0-1.23-.178-1.94-.178-1.94Z"></path><path fill="#EA4335" d="M28.9 11.71c-4.047 0-6.947 3.163-6.947 6.853 0 3.744 2.812 6.966 6.994 6.966 3.785 0 6.886-2.893 6.886-6.886 0-4.576-3.607-6.934-6.934-6.934Zm.04 2.714c1.99 0 3.875 1.609 3.875 4.2 0 2.538-1.878 4.193-3.885 4.193-2.205 0-3.945-1.766-3.945-4.212 0-2.394 1.718-4.181 3.954-4.181Z"></path><path fill="#FBBC05" d="M44.008 11.71c-4.047 0-6.947 3.163-6.947 6.853 0 3.744 2.813 6.966 6.994 6.966 3.785 0 6.886-2.893 6.886-6.886 0-4.576-3.607-6.934-6.933-6.934Zm.04 2.714c1.99 0 3.876 1.609 3.876 4.2 0 2.538-1.878 4.193-3.885 4.193-2.206 0-3.945-1.766-3.945-4.212 0-2.394 1.718-4.181 3.954-4.181Z"></path><path fill="#4285F4" d="M58.825 11.717c-3.714 0-6.633 3.253-6.633 6.904 0 4.16 3.384 6.918 6.57 6.918 1.969 0 3.016-.782 3.79-1.68v1.363c0 2.384-1.448 3.812-3.633 3.812-2.111 0-3.17-1.57-3.538-2.46l-2.655 1.11c.942 1.992 2.838 4.07 6.215 4.07 3.693 0 6.507-2.327 6.507-7.205V12.132h-2.897v1.17c-.89-.96-2.108-1.585-3.726-1.585Zm.27 2.709c1.82 0 3.69 1.554 3.69 4.21 0 2.699-1.866 4.187-3.731 4.187-1.98 0-3.823-1.608-3.823-4.161 0-2.653 1.914-4.236 3.863-4.236Z"></path><path fill="#EA4335" d="M78.33 11.7c-3.504 0-6.445 2.788-6.445 6.901 0 4.353 3.279 6.934 6.781 6.934 2.924 0 4.718-1.6 5.79-3.033l-2.39-1.589c-.62.962-1.656 1.902-3.385 1.902-1.942 0-2.836-1.064-3.389-2.094l9.266-3.845-.481-1.126c-.896-2.207-2.984-4.05-5.747-4.05Zm.12 2.658c1.263 0 2.172.671 2.558 1.476L74.82 18.42c-.267-2.002 1.63-4.062 3.63-4.062Z"></path><path fill="#34A853" d="M67.467 25.124h3.044V4.757h-3.044z"></path></g></svg>
                        :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 53" classNAme="injected-svg" datasrc="https://static.elfsight.com/icons/yelp-logo-multicolor.svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g fill="none" fill-rule="evenodd"><path fill="#FFF" fill-opacity=".96" fill-rule="nonzero" d="M129.95 18.519a14.449 14.449 0 0 0-2.81-3.933 6.327 6.327 0 0 0-.744-.608 6.727 6.727 0 0 0-.618-.418h-.044l-.056-.032a7.573 7.573 0 0 0-.712-.334h-.063a5.318 5.318 0 0 0-1.918-.36h-.273a5.302 5.302 0 0 0-2.067.561 8.883 8.883 0 0 0-2.068 1.489h-.038l-.037.037a.476.476 0 0 1-.08.072l-.119.11c-.42.388-.842.808-1.33 1.3l-.347.354c-.44.431-.875.866-1.306 1.304.134-2.296.279-4.648.395-6.982 0-.298.031-.607.056-.9a23.62 23.62 0 0 0 .062-3.068v-.25c-.062-1.166-.16-2.923-1.345-4.429-.87-1.121-2.606-2.432-5.911-2.432-.748.005-1.495.06-2.235.164-1.216.17-2.416.44-3.586.809-3.677 1.185-5.8 3.037-6.334 5.555-.39 1.865.31 3.488.768 4.563l.099.232a23.01 23.01 0 0 0 1.43 2.734l.447.785a513.34 513.34 0 0 0 3.46 6.077l-1.772-.608-.45-.157a47.475 47.475 0 0 0-1.778-.61l-.148-.041-.105-.03h-.1a8.945 8.945 0 0 0-2.527-.444h-.135a5.109 5.109 0 0 0-1.975.389 5.242 5.242 0 0 0-1.822 1.257c-.17.197-.33.4-.482.61l-.036.048-.038.054a7.048 7.048 0 0 0-.762 1.495v.037a14.098 14.098 0 0 0-.774 4.72c-1.579-6.076-6.754-10.568-12.86-10.568-2.217.007-4.392.59-6.304 1.691a6.328 6.328 0 0 0-7.765-.225v-3.198c-.079-3.347-2.843-6.032-6.254-6.076-3.463.012-6.262 2.775-6.255 6.175v6.642a7.01 7.01 0 0 0-.5-.578 14.875 14.875 0 0 0-6.571-3.92 14.447 14.447 0 0 0-7.71.006h-.067a13.526 13.526 0 0 0-5.486 2.868c-1.015-2.095-3.173-3.425-5.536-3.414a6.18 6.18 0 0 0-1.733.248c-3.097.918-4.336 3.872-5.09 5.634-.07.164-.132.317-.198.462-.187.438-.366.826-.508 1.137a13.3 13.3 0 0 0-.397.918c-.087.237-.161.4-.247.607a320.52 320.52 0 0 0-1.567-3.08l-.312-.645c-.779-1.643-1.949-4.109-4.859-4.972-3.004-.901-6.216.578-7.43 3.423-1.406 3.263.34 6.143 1.275 7.687a81.991 81.991 0 0 1 2.335 4.054c.345.607.476.863 1.238 2.314l.111.202L8 36.854c.23.419.482.899.78 1.46.316.606.675 1.262 1.07 1.992-.067.091-.135.188-.216.28l-.056.066-.087-.042a8.207 8.207 0 0 0-1.95-.681 6.59 6.59 0 0 0-1.455-.165c-2.181 0-4.198 1.142-5.289 2.996a5.818 5.818 0 0 0 .082 6.012c1.856 3.038 5.64 4.145 8.583 4.145a11.01 11.01 0 0 0 2.32-.237c6.608-1.41 9.469-7.659 11.556-12.221l.42-.919a87.63 87.63 0 0 1 1.344-2.88l.415-.895a14.082 14.082 0 0 0 1.838 3.745 15.716 15.716 0 0 0 1.648 2.024 15.143 15.143 0 0 0 2 1.683c.722.493 1.493.919 2.298 1.27.82.377 1.678.66 2.563.852.541.13 1.093.23 1.647.296.51.053 1.018.076 1.53.068h.451a16.233 16.233 0 0 0 5.382-.912 13.796 13.796 0 0 0 2.298-.984 8.142 8.142 0 0 0 3.095-3.125c.394 3.067 3.042 5.373 6.191 5.391a6.275 6.275 0 0 0 3.717-1.216v1.922c0 3.39 2.8 6.138 6.254 6.138 3.454 0 6.254-2.749 6.254-6.138v-1.677c1.32.45 2.707.681 4.106.68 7.343 0 13.318-6.419 13.331-14.307.151.478.36.937.619 1.369a5.29 5.29 0 0 0 1.518 1.536 5.646 5.646 0 0 0 2.947.918h.482a10.55 10.55 0 0 0 2.42-.34h.132l3.423-.76c-.538.73-1.065 1.44-1.572 2.145l-.285.395a37.71 37.71 0 0 0-1.084 1.525l-.087.134-.062.092-.03.042v.043a8.698 8.698 0 0 0-1.14 2.28 5.02 5.02 0 0 0-.197 2.12c.095.728.35 1.429.742 2.054v.03c.143.22.303.432.464.608l.038.037.031.042a7.4 7.4 0 0 0 .558.571c.227.22.471.424.73.61a15.601 15.601 0 0 0 3.975 1.913c1.203.392 2.452.628 3.715.699h.361c.207.002.413-.009.619-.031.257-.021.513-.055.766-.103h.112c.259-.06.517-.134.768-.22h.037a5.315 5.315 0 0 0 1.858-1.154c.51-.51.907-1.115 1.17-1.78.3-.797.48-1.632.533-2.48v-.11a.555.555 0 0 0 0-.11v-.14c.055-.606.08-1.165.11-1.822v-.935l.212.376.241.444c.335.607.619 1.118.916 1.604l.075.121.068.11v.037l.033.048a8.846 8.846 0 0 0 1.72 1.926 5.187 5.187 0 0 0 1.857 1.1h.038a5.1 5.1 0 0 0 2.19.238h.058c.266-.03.53-.073.792-.135h.11c.255-.064.506-.146.75-.241a6.78 6.78 0 0 0 .849-.383 14.226 14.226 0 0 0 3.034-2.231 15.396 15.396 0 0 0 2.724-3.428 6.575 6.575 0 0 0 .645-1.599v-.103a6.35 6.35 0 0 0 .136-.765v-.08a5.128 5.128 0 0 0-.248-2.14 5.073 5.073 0 0 0-1.14-1.823 9.04 9.04 0 0 0-2.037-1.555h-.044l-.05-.03-.098-.054-.124-.08c-.494-.286-1.046-.608-1.628-.887l-.483-.256a62.602 62.602 0 0 0-2.335-1.216l3.394-.771h.131a9.482 9.482 0 0 0 2.754-.967 5.53 5.53 0 0 0 2.236-2.09 4.95 4.95 0 0 0 .619-2.012c.272-2.193-.668-4.133-1.23-5.292h-.004Z"></path><path fill="#FF1A1A" fill-rule="nonzero" d="m104.371 30.428 2.043-.464c.043-.01.115-.026.2-.053 1.173-.309 1.886-1.474 1.613-2.635l-.008-.036a2.19 2.19 0 0 0-.348-.745 2.832 2.832 0 0 0-.833-.703 7.79 7.79 0 0 0-1.185-.538l-2.24-.803a209.576 209.576 0 0 0-3.784-1.342c-.822-.287-1.52-.54-2.125-.725a6.688 6.688 0 0 1-.343-.103c-.732-.219-1.247-.31-1.682-.314-.291-.01-.58.041-.849.151-.28.12-.532.295-.738.516a4.42 4.42 0 0 0-.289.357 4.185 4.185 0 0 0-.43.841 11.219 11.219 0 0 0-.614 3.746c.009 1.15.04 2.627.685 3.63.156.257.364.48.612.651.46.311.922.353 1.406.387.722.05 1.42-.122 2.117-.282l6.787-1.538.005.002Zm22.793-10.645a11.392 11.392 0 0 0-2.218-3.104 3.397 3.397 0 0 0-.378-.318 4.408 4.408 0 0 0-.384-.253 4.411 4.411 0 0 0-.42-.198 2.2 2.2 0 0 0-.89-.145 2.055 2.055 0 0 0-.833.23c-.389.19-.81.496-1.372 1.007-.077.075-.174.16-.262.241-.461.427-.977.954-1.589 1.566-.946.939-1.877 1.882-2.804 2.834l-1.658 1.688c-.302.308-.578.64-.823.994-.21.3-.36.636-.438.99a2.23 2.23 0 0 0 .02.822l.007.035c.273 1.16 1.432 1.9 2.623 1.675.069-.01.137-.022.205-.038l8.832-2.004c.697-.158 1.403-.303 2.028-.66.42-.237.819-.474 1.093-.95.146-.263.234-.553.26-.85.135-1.183-.493-2.525-.999-3.562Zm-15.81 3.645c.64-.79.64-1.965.695-2.928.194-3.213.396-6.426.558-9.641.06-1.218.194-2.42.12-3.647-.06-1.011-.067-2.174-.719-3.005-1.148-1.466-3.6-1.345-5.272-1.116a16.31 16.31 0 0 0-1.535.283c-.508.12-1.014.25-1.506.406-1.605.515-3.861 1.463-4.242 3.278-.217 1.026.295 2.074.69 3.012.48 1.133 1.135 2.156 1.732 3.224 1.58 2.82 3.189 5.624 4.792 8.43.48.837 1 1.897 1.928 2.332.062.026.125.048.189.07.415.154.87.183 1.301.085l.077-.016c.4-.108.762-.323 1.045-.617.053-.049.1-.097.148-.15h-.002Zm-.767 8.602a2.064 2.064 0 0 0-2.274-.752 2.23 2.23 0 0 0-.283.114 2.75 2.75 0 0 0-.402.247c-.36.28-.684.604-.96.965-.07.088-.136.206-.221.283l-1.421 1.917c-.804 1.076-1.6 2.153-2.386 3.247-.515.707-.959 1.304-1.311 1.83-.066.1-.135.21-.197.3-.422.638-.66 1.105-.783 1.52a1.951 1.951 0 0 0-.085.858c.039.3.142.588.302.847.085.129.177.254.275.375.213.24.452.457.714.644.981.67 2.055 1.152 3.184 1.524.94.306 1.916.49 2.904.544.17.009.338.005.506-.01.155-.013.31-.035.462-.064a4.6 4.6 0 0 0 .453-.128c.29-.107.552-.271.772-.484.208-.204.369-.45.469-.723.164-.402.272-.911.344-1.668.005-.108.022-.237.033-.355.056-.628.082-1.369.122-2.235.07-1.335.124-2.664.167-3.996l.092-2.371c.021-.544.003-1.15-.151-1.693a2.511 2.511 0 0 0-.325-.736Zm16.038 3.71c-.296-.321-.716-.638-1.379-1.031-.095-.054-.208-.123-.312-.184-.551-.327-1.216-.668-1.992-1.082a210.717 210.717 0 0 0-3.592-1.891l-2.128-1.108c-.11-.032-.222-.11-.327-.16a5.373 5.373 0 0 0-1.293-.452 2.43 2.43 0 0 0-.775-.03 2.028 2.028 0 0 0-1.706 1.656 2.53 2.53 0 0 0 .031.796c.103.557.356 1.107.619 1.588l1.135 2.092a216.752 216.752 0 0 0 1.93 3.521c.423.762.776 1.414 1.106 1.955.062.102.133.211.187.306.402.65.724 1.059 1.05 1.353a2.07 2.07 0 0 0 1.655.548 4.89 4.89 0 0 0 .464-.08c.314-.083.617-.2.904-.35.864-.475 1.66-1.06 2.368-1.74.85-.821 1.602-1.716 2.186-2.74a3.23 3.23 0 0 0 .21-.452 4.53 4.53 0 0 0 .143-.436 4.34 4.34 0 0 0 .078-.456 2.12 2.12 0 0 0-.103-.89 1.974 1.974 0 0 0-.46-.735v.001Z"></path><path fill="#000" d="M53.33 15.396c0-1.724 1.429-3.131 3.155-3.131 1.702 0 3.084 1.407 3.157 3.157V39.86c0 1.723-1.43 3.131-3.157 3.131-.843 0-1.65-.331-2.243-.92a3.07 3.07 0 0 1-.912-2.211V15.396Zm-2.936 15.096c-.025.485-.148 1.384-.788 2.04-.69.703-1.628.872-2.17.872-2.257.013-4.514.02-6.77.024-2.256.007-4.513.013-6.77.024.198.608.592 1.53 1.48 2.38.541.51 1.06.8 1.283.922.27.17 1.207.656 2.366.656 1.234 0 2.319-.39 3.38-.923l.087-.045c.739-.376 1.499-.762 2.304-.902.788-.121 1.628.024 2.244.559.74.63 1.037 1.552.764 2.5-.32 1.067-1.232 1.99-2.194 2.547a10.94 10.94 0 0 1-1.726.8c-1.526.532-3.14.78-4.759.73-.394 0-.814 0-1.234-.048a11.39 11.39 0 0 1-1.306-.243 9.389 9.389 0 0 1-1.974-.656 10.865 10.865 0 0 1-1.8-.995 11.712 11.712 0 0 1-1.577-1.335 12.041 12.041 0 0 1-1.308-1.601c-1.331-1.99-1.948-4.442-1.825-6.821.098-2.33.888-4.66 2.319-6.552.154-.238.333-.44.502-.63.074-.084.146-.164.213-.245 1.766-2.12 4.126-2.79 5.099-3.066l.054-.016c1.975-.55 4.067-.55 6.042 0 .47.122 3.108.923 5.154 3.082.099.097.371.413.716.875a11.468 11.468 0 0 1 1.895 3.894l.003.013a8.01 8.01 0 0 1 .296 2.158v.002Zm-14.475-4.004a5.452 5.452 0 0 0-1.924 3.057h10.752a5.62 5.62 0 0 0-1.948-3.059 5.688 5.688 0 0 0-3.452-1.212 5.594 5.594 0 0 0-3.43 1.212l.002.002Zm40.887-6.433c-2.811 0-5.376 1.239-7.201 3.254v-.074c-.076-1.684-1.514-2.996-3.23-2.95-1.716.047-3.077 1.435-3.059 3.12V46.73a3.064 3.064 0 0 0 .92 2.198c.593.583 1.399.91 2.238.908a3.181 3.181 0 0 0 2.236-.909 3.063 3.063 0 0 0 .92-2.197v-7.282c1.824 1.99 4.365 3.253 7.2 3.253 5.649 0 10.235-5.025 10.235-11.287-.025-6.26-4.611-11.358-10.26-11.358Zm-1.38 17.572c-3.207 0-5.821-2.743-5.821-6.164 0-3.446 2.59-6.19 5.82-6.19 3.205 0 5.82 2.744 5.82 6.19-.025 3.421-2.615 6.164-5.82 6.164Zm-52.06-4.587-1.035 2.234c-.47.97-.938 1.965-1.382 2.96l-.428.934c-1.972 4.304-4.31 9.413-9.411 10.497-2.466.534-6.19-.194-7.572-2.476-1.38-2.305.667-4.95 3.305-4.344.417.09.826.29 1.24.493.687.339 1.384.678 2.14.527.715-.12 1.158-.631 1.726-1.287a6.01 6.01 0 0 0 1.281-2.403l-.036-.084a1.172 1.172 0 0 0-.038-.085 344.765 344.765 0 0 1-1.67-3.104c-.263-.495-.528-.99-.796-1.483l-1.075-2.004a227.295 227.295 0 0 0-1.267-2.34 88.589 88.589 0 0 0-2.417-4.199c-.912-1.506-1.85-3.18-1.085-4.952.596-1.424 2.204-2.162 3.7-1.698 1.586.472 2.29 1.955 2.946 3.34.12.252.237.5.358.736a733.846 733.846 0 0 1 3.131 6.19c.092.205.23.483.4.825.152.302.327.655.513 1.043l.274.56c.106.22.2.407.269.557.48-1.176.968-2.347 1.454-3.52.487-1.17.974-2.341 1.455-3.519.013-.064.128-.316.302-.694.146-.32.333-.731.537-1.198l.208-.495c.64-1.53 1.411-3.37 3.121-3.873a3.073 3.073 0 0 1 3.33 1.14c.37.509.517 1.092.541 1.675.02 1.289-.613 2.67-1.158 3.856-.131.29-.26.567-.37.828l-.065.141c-.151.334-.561 1.236-1.267 2.722-.254.532-.499 1.067-.746 1.606l-.412.894Z"></path></g></svg>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}