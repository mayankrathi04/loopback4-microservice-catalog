import {
  injectable,
  /* inject, */
  BindingScope,
  inject,
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {ILogger, LOGGER} from '@sourceloop/core';
import {SectionRepository} from '../repositories/section.repository';
import {SurveyQuestionRepository} from '../repositories/survey-question.repository';
import {SurveyRepository} from '../repositories/survey.repository';
import {ErrorKeys} from '../enum/error-keys.enum';
import {SurveyStatus} from '../enum';
import {
  SectionRepository as SectionSequelizeRepo,
  SurveyQuestionRepository as SurveyQuestionSequelizeRepo,
  SurveyRepository as SurveySequelizeRepo,
} from '../repositories/sequelize';
@injectable({scope: BindingScope.TRANSIENT})
export class SectionService {
  constructor(
    @repository(SectionRepository)
    public sectionRepository: SectionRepository | SectionSequelizeRepo,
    @repository(SurveyQuestionRepository)
    public surveyQuestionRepository:
      | SurveyQuestionRepository
      | SurveyQuestionSequelizeRepo,
    @repository(SurveyRepository)
    public surveyRepository: SurveyRepository | SurveySequelizeRepo,
    @inject(LOGGER.LOGGER_INJECT) public logger: ILogger,
  ) {}

  async handleDeleteSection(surveyId: string, sectionId: string) {
    const existingSections = await this.sectionRepository.find({
      where: {surveyId},
    });
    const sectionToDelete = existingSections.find(
      existingSection => existingSection.id === sectionId,
    );

    /*
      For example — Section 1 = 20 questions, Section 2 = 30 questions, Section 3 = 10 questions 
      case1: If user removes section 1 - 
      Section 2 = 50 questions
      Section 3 = 10 questions 

      case2: If user removes section 2 - 
      Section 1 = 20 questions
      Section 3 = 40 questions 

      case3: If user removes section 3 - 
      Section 1 = 20 questions
      Section 2 = 40 questions

      case4: if there is only one section then
      remove the sectionID from survey Questions
    */
    if (!sectionToDelete?.displayOrder) {
      throw new HttpErrors.BadRequest(ErrorKeys.DisplayOrderMissing);
    }
    let sectionIdToUpdate;
    if (existingSections.length > 1) {
      const orderOfSectionToUpdate =
        sectionToDelete.displayOrder < existingSections.length
          ? sectionToDelete.displayOrder + 1
          : sectionToDelete.displayOrder - 1;
      sectionIdToUpdate = existingSections.find(
        existingSection =>
          existingSection.displayOrder === orderOfSectionToUpdate,
      )?.id;

      this.surveyQuestionRepository
        .updateAll({sectionId: sectionIdToUpdate}, {sectionId})
        .then()
        .catch(err => Promise.reject(err));

      this.sectionRepository
        .reorder(surveyId, sectionToDelete.displayOrder)
        .then()
        .catch(err => this.logger.error(JSON.stringify(err)));
    }
    if (existingSections.length === 1) {
      this.surveyQuestionRepository
        /* ! is added below because we want to remove the sections
      but keep the questions, adding string|null to the model has a problem 
       while creating the entity it interprets as an object. thus throwing error.
      */
        .updateAll({sectionId: null!}, {sectionId})
        .then()
        .catch(err => Promise.reject(err));
    }
  }

  async checkBasicSectionValidation(surveyId: string) {
    const survey = await this.surveyRepository.findById(surveyId, {
      fields: {id: true, status: true},
    });
    if (survey.status !== SurveyStatus.DRAFT) {
      throw new HttpErrors.BadRequest();
    }
  }
}
