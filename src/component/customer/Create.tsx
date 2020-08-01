import * as React from './node_modules/react';
import axios from './node_modules/axios';
import { RouteComponentProps, withRouter } from './node_modules/react-router-dom';

export interface IValues {
    name: string,
    id: string,
    product_id: string,
    color: string,
    price: string,
    company: string,
    size: string,
    order_id: string,
    quantity: string;
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            name: '',
            id: '',
            product_id: '',
            color: '',
            price: '',
            company: '',
            size: '',
            order_id: '',
            quantity: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            name: this.state.name,
            id: this.state.id,
            product_id: this.state.product_id,
            color: this.state.color,
            price: this.state.price,
            company: this.state.company,
            size: this.state.size,
            order_id: this.state.order_id,
            quantity: this.state.quantity
        }
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:5000/customers`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
    })

}

public render() {
    const { submitSuccess, loading } = this.state;
    return (
        <div>
            <div className={"col-md-12 form-wrapper"}>
                <h2> Create Post </h2>
                {!submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Fill the form below to create a new post
                </div>
                )}

                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                        </div>
                )}

                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                    <div className="form-group col-md-12">
                        <label htmlFor="name"> Name </label>
                        <input type="text" id="name" onChange={(e) => this.handleInputChanges(e)} name="name" className="form-control"/>
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="id">Id</label>
                        <input type="text" id="id" onChange={(e) => this.handleInputChanges(e)} name="id" className="form-control"/>
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="product_id"> Product_id </label>
                        <input type="text" id="product_id" onChange={(e) => this.handleInputChanges(e)} name="product_id" className="form-control"  />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="color"> Color</label>
                        <input type="text" id="" onChange={(e) => this.handleInputChanges(e)} name="color" className="form-control"/>
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="size"> Size </label>
                        <input type="text" id="size" onChange={(e) => this.handleInputChanges(e)} name="size" className="form-control"  />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="company"> Company</label>
                        <input type="text" id="company" onChange={(e) => this.handleInputChanges(e)} name="company" className="form-control" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="Order_id"> Order_id</label>
                        <input type="text" id="order_id" onChange={(e) => this.handleInputChanges(e)} name="order_id" className="form-control" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="quantity"> Quantity</label>
                        <input type="text" id="quantity" onChange={(e) => this.handleInputChanges(e)} name="quantity" className="form-control" />
                    </div>

                    <div className="form-group col-md-4 pull-right">
                        <button className="btn btn-success" type="submit">
                            Create Customer
          </button>
                        {loading &&
                            <span className="fa fa-circle-o-notch fa-spin" />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
}
export default withRouter(Create)