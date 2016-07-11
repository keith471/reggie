console.log("Successfully served js script");

var React = require("react");
var ReactDOM = require("react-dom");
var Formsy = require('formsy-react');

const SignUpLogInButtons = React.createClass({
    transitionToSignUp() {
        console.log("sign up clicked");
        renderSignUpPage();
    },

    transitionToLogIn() {
        console.log("log in clicked");
        renderLogInPage();
    },

    render() {
        return (
            <div>
                <button type="button" onClick={this.transitionToSignUp}>Sign up</button>
                <button type="button" onClick={this.transitionToLogIn}>Log in</button>
            </div>
        );
    }
});

const SignUpForm = React.createClass({
  getInitialState() {
    return { canSubmit: false };
  },
  submit(data) {
    alert(JSON.stringify(data, null, 4));
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },
  render() {
    return (
      <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="signup">
        <MyInput name="mcgillEmail" title="McGill Email*" validations="isEmail" validationError="This is not a valid email" required />
        <MyInput name="mcgillPassword" title="McGill Password*" type="password" required />
        <MyInput name="preferredEmail" title="Preferred Email" validations="isEmail" validationError="This is not a valid email" />
        <button type="submit" disabled={!this.state.canSubmit}>Create Account</button>
      </Formsy.Form>
    );
  }
});

const LogInForm = React.createClass({
  getInitialState() {
    return { canSubmit: false };
  },
  submit(data) {
    alert(JSON.stringify(data, null, 4));
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },
  render() {
    return (
      <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
        <MyInput name="mcgillEmail" title="McGill Email*" validations="isEmail" validationError="This is not a valid email" required />
        <MyInput name="mcgillPassword" title="McGill Password*" type="password" required />
        <button type="submit" disabled={!this.state.canSubmit}>Log in</button>
      </Formsy.Form>
    );
  }
});

const MyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

const AddCourseForm = React.createClass({
    getInitialState: function() {
        return { canSubmit: false };
    },
    enableButton: function() {
        this.setState({ canSubmit: true });
    },
    disableButton: function() {
        this.setState({ canSubmit: false });
    },
    submit: function(model) {
        console.log(model);
        alert(JSON.stringify(data, null, 4));
    },
    render: function() {
        return (
            <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
              <MyInput name="courseCode" title="Course Code" required />
              <MyInput name="courseNumber" title="Course Number" required />
              <MyInput name="crn" title="CRN" required />
              <div>
                  <MyInput type="radio" name="fall" title="Fall" value="201609" checked />
                  <MyInput type="radio" name="winter" title="Winter" value="201701" />
                  <MyInput type="radio" name="summer" title="Summer" value="201705" />
              </div>
              <div className="buttons">
                <button type="submit" disabled={!this.state.canSubmit}>Add</button>
              </div>
            </Formsy.Form>
        );
    }
});

function renderSignUpPage() {
    ReactDOM.render(
        <SignUpForm />,
        document.getElementById('content')
    );
}

function renderAddCoursesPage() {
    ReactDOM.render(
        <AddCourseForm />,
        document.getElementById('content')
    );
}

function renderSignUpLogInPage() {
    ReactDOM.render(
        <SignUpLogInButtons />,
        document.getElementById('content')
    );
}

function renderLogInPage() {
    ReactDOM.render(
        <LogInForm />,
        document.getElementById('content')
    );
}


renderSignUpLogInPage();
