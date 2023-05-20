import "./Medicine.css";
import star from '../../images/star.png';
const arr = [1, 2, 3, 4, 5];

function Medicine() {
    console.log("Buraya giremedim :(");
    console.log("Alooooooo")

    // burada bi şekilde medicine mı product mı öğrenmem lazım:
    let isMedicine = true;
    return (
        <div>
            <div className="medicineInfoHolder">
                <div className="elementsHolder">
                    <div className="sectionHolder">
                        <h1 className="medicineTitle">Parol</h1>
                        <img src={"https://picsum.photos/200/200"} className="productImg"></img>
                        <p>22 TL</p>
                    </div>
                    <div className="sectionHolder2">
                        {isMedicine &&
                            <div>
                                <p className="productInfoPar"><strong>Drug Class:</strong> Fever reducer, Painkiller</p>
                                <p className="productInfoPar"><strong>Side Effects:</strong> Headache, Dizziness</p>
                                <p className="productInfoPar"><strong>Company:</strong> Atabay</p>
                                <p className="productInfoPar"><strong>Prescription Type:</strong> None</p>
                                <p className="productInfoPar"><strong>Age Group:</strong> Adolescents, Adults</p>
                                <p className="productInfoPar"><strong>Intake Method:</strong> Oral</p>
                                <p className="productInfoPar"><strong>Medicine Type:</strong> Tablet</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="medicineInfoHolder2">
                {arr.map(item => (
                    <div className="pharmacyInfoHolder">
                        <p className="pharmacyTitle">Gönül Pharmacy</p>
                        <div className="pharmacyReviewInfo">
                            <p className="pharmacyInfoPar">123 Reviews</p>
                            <div className="starHolder">
                                <img src={star} className="starImg"></img>
                                <img src={star} className="starImg"></img>
                                <img src={star} className="starImg"></img>
                                <img src={star} className="starImg"></img>
                                <img src={star} className="starImg"></img>
                            </div>
                            <button className="addCartBtn">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Medicine;