import "../assets/css/packages.css";

export default function Packages() {
    return (
        <div id="packdiv">
            <div id="overlay"></div>
            <div id="listdiv">
                <strong>
                    <ul id="liul">
                        <li>Starting Packages</li>
                        <br />
                        <li>2 Hour Video Gaming Party</li> <br />
                        <li>3 Hour Video Gaming Party</li> <br />
                        <li>Laser Tag Party!</li>
                        <li style={{ color: "#FF9800" }}>3-Hour Movie Package (Contact for More Info)</li>
                        <li style={{ color: "#FF2F2F" }}>*Birthday Child receives a Free Birthday T-Shirt!</li>
                        <li>All Party Attendants receive Prestigious Gaming Wristbands! </li>
                        <li>
                            <span id="PLUS">*PLUS</span> - gives you additional amenities for the duration of the Game
                            Trailer Party!
                        </li>
                        <br />
                        <li style={{ color: "#FF5722" }}>Playstation VR!</li>
                        <li style={{ color: "#FF5722" }}>Extra Large Connect 4!</li>
                        <li style={{ color: "#FF5722" }}> Extra Large Yard Jenga!</li>
                        <li style={{ color: "#FF7E00" }}>Popcorn Machine!</li>
                        <li style={{ color: "#FF007F" }}>Cotton Candy Machine!</li>
                        <li style={{ marginTop: 20, textDecoration: "underline" }}>
                            For a More Fun and Exciting Party, You can also add:
                        </li>
                        <li style={{ color: "#FF5722" }}>Laser Tag with Live Scoring!</li>
                        <li style={{ color: "#8778C4" }}>Karaoke!</li>
                        <li style={{ color: "#E91E63" }}>Hot Dog Grill!</li>
                        <li style={{ color: "#05ff69" }}>Yard Games!</li>
                        <li style={{ fontSize: "80%" }}>
                            Please note: All Parties over 4 hours will receive a complimentary plus item after game time
                            is over!
                        </li>
                    </ul>
                </strong>
            </div>
        </div>
    );
}
