var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

var libs = [
    'lib/jquery/dist/jquery.min.js',
    'lib/jquery-ui/ui/minified/jquery-ui.min.js',
    'lib/bootstrap/dist/js/bootstrap.min.js',
    'lib/off-bower/pace.min.js',
    'lib/angular/angular.min.js',
    'lib/angular-route/angular-route.min.js',
    'lib/angular-resource/angular-resource.min.js',
    'lib/angular-bootstrap/ui-bootstrap.min.js',
    'lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'lib/es5-shim/es5-sham.min.js',
    'lib/angular-file-upload/angular-file-upload.min.js',
    'lib/angular-ui-utils/ui-utils.min.js',
    'lib/angular-animate/angular-animate.min.js',
    'lib/angularjs-toaster/toaster.min.js',
    'lib/angular-filter/dist/angular-filter.min.js',
    'lib/angularjs-dropdown-multiselect/dist/angularjs-dropdown-multiselect.min.js',
    'lib/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
    'lib/angular-confirm-modal/angular-confirm.min.js',
    'lib/admin-lte/dist/js/app.min.js',
    'lib/angular-i18n/angular-locale_pt-br.js',
    'lib/modernizr/modernizr.js',
    'lib/checklist-model/checklist-model.js',
    'scripts/app.js',
    'scripts/offcanvas.js',
    'scripts/directives/datepicker.js',
    'scripts/directives/timepicker.js',
    'scripts/directives/datetimepicker.js',
    'scripts/filters/startFromFilter.js',
    'scripts/filters/genericSearchFilter.js',
    'scripts/filters/tagsFilter.js',
    'lib/ng-tags-input/ng-tags-input.min.js',
    'scripts/services/AgendaComissaoFactory.js',
    'scripts/controllers/gerenciarReuniaoController.js',
    'scripts/controllers/modalBuscarProposicaoController.js',
    'scripts/controllers/modalAddProposicaoController.js',
    'scripts/controllers/modalComentariosController.js',
    'scripts/controllers/modalEncaminhamentosController.js',
    'scripts/controllers/modalRelatorioReuniaoController.js',
    'scripts/controllers/modalRelatorioProposicaoController.js',
    'scripts/services/ComentarioFactory.js',
    'scripts/services/ComentarioService.js',
    'scripts/services/EncaminhamentoProposicaoFactory.js',
    'scripts/services/ComissaoFactory.js',
    'scripts/services/ProposicaoFactory.js',
    'scripts/services/ReuniaoFactory.js',
    'scripts/services/ElaboracaoNormativaFactory.js',
    'scripts/services/TarefaFactory.js',
    'scripts/services/NotificacaoFactory.js',
    'scripts/controllers/newPosicionamentoController.js',
    'scripts/controllers/searchPosicionamentoController.js',
    'scripts/controllers/editPosicionamentoController.js',
    'scripts/services/PosicionamentoFactory.js',
    'scripts/services/TipoEncaminhamentoFactory.js',
    'scripts/controllers/newTipoEncaminhamentoController.js',
    'scripts/controllers/searchTipoEncaminhamentoController.js',
    'scripts/controllers/editTipoEncaminhamentoController.js',
    'scripts/services/EquipeFactory.js',
    'scripts/controllers/searchEquipeController.js',
    'scripts/controllers/equipeController.js',
    'scripts/services/UsuarioFactory.js',
    'scripts/controllers/newUsuarioController.js',
    'scripts/controllers/searchUsuarioController.js',
    'scripts/controllers/editUsuarioController.js',
    'scripts/services/ReuniaoProposicaoFactory.js',
    'scripts/services/TagFactory.js',
    'scripts/controllers/searchElaboracaoNormativaController.js',
    'scripts/controllers/elaboracaoNormativaController.js',
    'scripts/controllers/searchStatusSidofController.js',
    'scripts/controllers/newStatusSidofController.js',
    'scripts/controllers/editStatusSidofController.js',
    'scripts/controllers/uploadController.js',
    'scripts/controllers/tarefaController.js',
    'scripts/controllers/notificacaoController.js',
    'scripts/services/OrigemElaboracaoNormativaFactory.js',
    'scripts/controllers/newOrigemElaboracaoNormativaController.js',
    'scripts/controllers/searchOrigemElaboracaoNormativaController.js',
    'scripts/services/AreaConsultadaFactory.js',
    'scripts/controllers/newAreaConsultadaController.js',
    'scripts/controllers/searchAreaConsultadaController.js',
    'scripts/controllers/editAreaConsultadaController.js',
    'scripts/services/OrgaoFactory.js',
    'scripts/controllers/newOrgaoController.js',
    'scripts/controllers/searchOrgaoController.js',
    'scripts/controllers/editOrgaoController.js',
    'scripts/controllers/SearchAgendaComissaoController.js',
    'scripts/services/ElaboracaoNormativaConsultaFactory.js',
    'scripts/services/StatusSidofFactory.js',
    'scripts/services/locationParser.js'

];

var compilacao = function() {
    console.info("Compilação executada");
    return gulp.src(libs)
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./scripts'));
}

gulp.task('compress', compilacao);

gulp.task('watch', function() {
    watch('scripts/**/*.js',compilacao);
});

gulp.task('default', ['compress'], function() {
  // place code for your default task here
});